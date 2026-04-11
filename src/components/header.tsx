"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Systems", link: "/systems" },
  { name: "Verticals", link: "/verticals" },
  { name: "Pricing", link: "/pricing" },
  { name: "Nova", link: "/nova" },
  { name: "About", link: "/about" },
];

export function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full fixed top-2 inset-x-0 z-50"
    >
      <DesktopNav visible={visible} />
      <MobileNav visible={visible} />
    </motion.div>
  );
}

function DesktopNav({ visible }: { visible: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{
        width: visible ? "55%" : "80%",
        backgroundColor: visible
          ? "rgba(250, 245, 240, 0.95)"
          : "rgba(250, 245, 240, 0.6)",
        backdropFilter: visible ? "blur(12px)" : "blur(6px)",
        y: visible ? 4 : 0,
        boxShadow: visible
          ? "0 10px 30px -10px rgba(42, 42, 42, 0.08)"
          : "0 0 0 transparent",
      }}
      initial={{
        width: "80%",
        scale: 0.95,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "hidden lg:flex flex-row self-center items-center justify-between py-3 mx-auto px-8 rounded-full relative z-[100]",
        visible && "border border-charcoal/5"
      )}
    >
      {/* Wordmark */}
      <Link
        href="/"
        className="font-serif italic text-xl text-charcoal hover:text-wine transition-colors shrink-0"
      >
        Ops by Noell
      </Link>

      {/* Nav items */}
      <motion.div
        className="lg:flex flex-row flex-1 items-center justify-center space-x-1 text-sm"
        animate={{
          scale: 1,
          justifyContent: visible ? "flex-end" : "center",
        }}
      >
        {navItems.map((item, idx) => (
          <motion.div
            key={item.link}
            onHoverStart={() => setHoveredIndex(idx)}
            className="relative"
          >
            <Link
              className="text-charcoal/70 relative px-3 py-1.5 transition-colors hover:text-charcoal text-sm"
              href={item.link}
            >
              <span className="relative z-10">{item.name}</span>
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="menu-hover"
                  className="absolute inset-0 rounded-full bg-blush/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.05 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA - appears/disappears like template */}
      <AnimatePresence mode="popLayout" initial={false}>
        {!visible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
          >
            <Link
              href="/book"
              className="bg-wine text-cream text-sm px-5 py-2 rounded-md hover:bg-wine-light transition-colors inline-flex items-center"
            >
              Book Free Audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileNav({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={{
        backdropFilter: "blur(16px)",
        background: visible
          ? "rgba(250, 245, 240, 0.95)"
          : "rgba(250, 245, 240, 0.8)",
        width: visible ? "85%" : "90%",
        y: visible ? 4 : 0,
        borderRadius: open ? "24px" : "9999px",
        padding: "12px 20px",
        boxShadow: visible
          ? "0 10px 30px -10px rgba(42, 42, 42, 0.08)"
          : "0 0 0 transparent",
      }}
      initial={{
        width: "85%",
        scale: 0.95,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="flex relative flex-col lg:hidden w-full justify-between items-center max-w-[calc(100vw-2rem)] mx-auto z-50"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <Link
          href="/"
          className="font-serif italic text-xl text-charcoal"
        >
          Ops by Noell
        </Link>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {open ? (
            <X className="w-6 h-6 text-charcoal/70 cursor-pointer" onClick={() => setOpen(false)} />
          ) : (
            <Menu className="w-6 h-6 text-charcoal/70 cursor-pointer" onClick={() => setOpen(true)} />
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex rounded-2xl absolute top-16 backdrop-blur-xl bg-cream/95 inset-x-0 z-50 flex-col items-start justify-start gap-4 w-full px-6 py-6 shadow-lg border border-charcoal/5"
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.link}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.05 } }}
                whileHover={{ x: 5 }}
              >
                <Link
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="text-charcoal/80 hover:text-charcoal transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="bg-wine text-cream text-sm px-6 py-3 rounded-md hover:bg-wine-light transition-colors mt-2"
            >
              Book Free Audit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
