"use client";

import React from "react";
import { Button } from "./button";
import { trackMetaEvent } from "@/lib/meta-pixel-track";
import { FOUNDER_CHECKOUT_URL } from "@/lib/stripe-links";

type Variant = "primary" | "wine" | "secondary";

export function AgentsFoundingCta({
  href = FOUNDER_CHECKOUT_URL,
  className,
  children,
  variant = "primary",
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <Button
      href={href}
      variant={variant}
      className={className}
      onClick={() => {
        trackMetaEvent("InitiateCheckout", {
          value: 197,
          currency: "USD",
          content_name: "noell_agents_founding",
        });
      }}
    >
      {children}
    </Button>
  );
}
