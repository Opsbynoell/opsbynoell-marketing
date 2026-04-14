/**
 * End-to-end flow tests for the three agents.
 *
 * These are pure function tests (no UI, no network). They run the `step()`
 * reducer turn-by-turn against each agent and assert that the resulting
 * messages, captured fields, stage transitions, and side-effects match the
 * v1 contract.
 *
 * Run: `npx tsc --noEmit` type-checks this file. To execute, wire a runner
 * (Vitest/Jest) — these assertions use a tiny local harness so they can be
 * type-checked without pulling in a test framework.
 */

import { supportAgent } from "../agents/support";
import { frontDeskAgent } from "../agents/front-desk";
import { careAgent } from "../agents/care";
import { defaultClient } from "../clients/default";
import { getVertical } from "../verticals/presets";
import { initialState, step } from "../core";
import type { ConversationState, Message } from "../types";

type Turn = {
  input: string;
  expectSideEffectKind?: "capture" | "route" | "escalate" | "none";
  expectStage?: ConversationState["stage"];
  expectAgentResponseContains?: string[];
  expectCaptured?: Record<string, string>;
};

function simulate(params: {
  agent: typeof supportAgent;
  turns: Turn[];
  clientOverride?: typeof defaultClient;
}) {
  const client = params.clientOverride ?? defaultClient;
  const vertical = getVertical(client.vertical);
  let state = initialState();
  const log: Array<{ turn: number; visitor: string; agent: Message[] }> = [];

  for (let i = 0; i < params.turns.length; i++) {
    const turn = params.turns[i];
    const result = step({
      agent: params.agent,
      client,
      vertical,
      state,
      visitorInput: turn.input,
    });
    log.push({ turn: i + 1, visitor: turn.input, agent: result.agentResponses });

    if (turn.expectSideEffectKind) {
      if (result.sideEffect?.kind !== turn.expectSideEffectKind) {
        throw new Error(
          `Turn ${i + 1}: expected side-effect "${turn.expectSideEffectKind}" but got "${result.sideEffect?.kind ?? "undefined"}"`
        );
      }
    }
    if (turn.expectStage && result.nextState.stage !== turn.expectStage) {
      throw new Error(
        `Turn ${i + 1}: expected stage "${turn.expectStage}" but got "${result.nextState.stage}"`
      );
    }
    for (const needle of turn.expectAgentResponseContains ?? []) {
      const haystack = result.agentResponses.map((r) => r.text).join(" | ");
      if (!haystack.toLowerCase().includes(needle.toLowerCase())) {
        throw new Error(
          `Turn ${i + 1}: agent response did not contain "${needle}". Got: ${haystack}`
        );
      }
    }
    if (turn.expectCaptured) {
      for (const [k, v] of Object.entries(turn.expectCaptured)) {
        if (result.nextState.captured[k] !== v) {
          throw new Error(
            `Turn ${i + 1}: expected captured.${k} = "${v}" but got "${result.nextState.captured[k]}"`
          );
        }
      }
    }
    state = result.nextState;
  }
  return { state, log };
}

// ---------------------------------------------------------------------------
// Support: booking_new — 3-turn flow (intent → qualification → contact → done)
// ---------------------------------------------------------------------------

export const supportBookingNewScenario = () =>
  simulate({
    agent: supportAgent,
    turns: [
      {
        input: "i'm new — book me in",
        expectStage: "qualified",
        expectAgentResponseContains: ["route you to the right booking", "which service"],
      },
      {
        input: "Deep tissue, ideally Saturday morning",
        expectSideEffectKind: "capture",
        expectCaptured: { qualification: "Deep tissue, ideally Saturday morning" },
        expectAgentResponseContains: ["share your name and best number"],
      },
      {
        input: "Jess Smith, 512-555-0102",
        expectSideEffectKind: "route",
        expectStage: "captured",
        expectAgentResponseContains: [
          "jess",
          "deep tissue, ideally saturday morning",
          "/book",
        ],
      },
    ],
  });

// ---------------------------------------------------------------------------
// Front Desk: missed_call_textback
// ---------------------------------------------------------------------------

export const frontDeskMissedCallScenario = () =>
  simulate({
    agent: frontDeskAgent,
    turns: [
      {
        input: "send missed-call text-back",
        expectStage: "qualified",
        expectAgentResponseContains: ["what number"],
      },
      {
        input: "512-555-0199",
        expectAgentResponseContains: ["name or context"],
      },
      {
        input: "Unknown",
        expectSideEffectKind: "route",
        expectStage: "resolved",
        expectAgentResponseContains: ["queued text-back"],
      },
    ],
  });

// ---------------------------------------------------------------------------
// Front Desk: reschedule
// ---------------------------------------------------------------------------

export const frontDeskRescheduleScenario = () =>
  simulate({
    agent: frontDeskAgent,
    turns: [
      {
        input: "reschedule a client",
        expectStage: "qualified",
        expectAgentResponseContains: ["which client"],
      },
      {
        input: "Anna Lee, 512-555-0190",
      },
      {
        input: "Thursday after 3pm",
        expectSideEffectKind: "route",
        expectStage: "resolved",
        expectAgentResponseContains: ["queued", "thursday after 3pm"],
      },
    ],
  });

// ---------------------------------------------------------------------------
// Care: change_appointment (3-slot flow)
// ---------------------------------------------------------------------------

export const careChangeAppointmentScenario = () =>
  simulate({
    agent: careAgent,
    turns: [
      {
        input: "change my appointment",
        expectStage: "qualified",
        expectAgentResponseContains: ["which appointment"],
      },
      {
        input: "Saturday deep tissue",
        expectAgentResponseContains: ["window"],
      },
      {
        input: "Sunday afternoon",
        expectAgentResponseContains: ["name and best number"],
      },
      {
        input: "Jess 512-555-0102",
        expectSideEffectKind: "route",
        expectStage: "captured",
        expectAgentResponseContains: ["jess", "saturday deep tissue", "sunday afternoon"],
      },
    ],
  });

// ---------------------------------------------------------------------------
// Care: directions — answers from client.locations without any capture required
// ---------------------------------------------------------------------------

export const careDirectionsScenario = () =>
  simulate({
    agent: careAgent,
    turns: [
      {
        input: "where do i park",
        expectStage: "qualified",
        expectAgentResponseContains: [
          "ops by noell",
          "austin",
          "virtual audits",
        ],
      },
      {
        input: "no thanks",
        expectSideEffectKind: "route",
        expectStage: "resolved",
      },
    ],
  });

/**
 * Runs every scenario. Throws on the first failed assertion.
 * Usable as a smoke test from a script (`ts-node`), a CI check, or a
 * test-framework wrapper.
 */
export function runAllFlows() {
  supportBookingNewScenario();
  frontDeskMissedCallScenario();
  frontDeskRescheduleScenario();
  careChangeAppointmentScenario();
  careDirectionsScenario();
  return "ok";
}
