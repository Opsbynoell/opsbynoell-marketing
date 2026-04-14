"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button } from "./button";
import { Logo } from "./logo";

interface NavbarItem {
  name: string;
  link: string;
  nova?: boolean;
  children?: { name: string; link: string; note?: string }[];
}

interface NavbarProps {
  navItems: NavbarItem[];
  visible: boolean;
}

const verticalItems = [
  { name: "Med Spas", link: "/verticals/med-spas", note: "Consult conversion and follow-up" },
  { name: "Salons", link: "/verticals/salons", note: "Sharper booking and rebooking path" },
  { name: "Massage Therapy", link: "/verticals/massage", note: "Calm, trust-first booking flow" },
  { name: "Dental Offices", link: "/verticals/dental", note: "Trust-first scheduling page" },
  { name: "HVAC", link: "/verticals/hvac", note: "Urgent-call, grounded service tone" },
  { name: "Home Services", link: "/verticals/home-services", note: "Broader service-led ad page" },
  { name: "Pool Services", link: "/verticals/pool-services", note: "Recurring-service and reactivation focus" },
];

export const Navbar = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Systems", link: "/#systems" },
    { name: "Verticals", link: "/verticals", children: verticalItems },
    { name: "Pricing", link: "/#pricing" },
    { name: "Noell Support", link: "/noell-support", nova: true },
    { name: "Book", link: "/book" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

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
      <DesktopNav visible={visible} navItems={navItems} />
      <MobileNav visible={visible} navItems={navItems} />
    </motion.div>
  );
};

const DesktopNav = ({ navItems, visible }: NavbarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{
        width: visible ? "60%" : "85%",
        backgroundColor: visible
          ? "rgba(250, 246, 241, 0.95)"
          : "rgba(250, 246, 241, 0.6)",
        backdropFilter: visible ? "blur(10px)" : "blur(5px)",
        y: visible ? 4 : 0,
        boxShadow: visible
          ? "0 10px 30px -10px rgba(28,25,23,0.08)"
          : "0 0 0 transparent",
      }}
      initial={{ width: "85%", scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "hidden lg:flex flex-row self-center items-center justify-between py-3 mx-auto px-8 rounded-full relative z-[100] border border-warm-border/40"
      )}
    >
      <Logo />
      <motion.div
        className="lg:flex flex-row flex-1 items-center justify-center space-x-1 text-sm"
        animate={{ scale: 1, justifyContent: visible ? "flex-end" : "center" }}
      >
        {navItems.map((navItem, idx) => (
          <motion.div
            key={`nav-item-${idx}`}
            onHoverStart={() => setHoveredIndex(idx)}
            className="relative"
          >
            <Link
              className="text-charcoal/80 hover:text-charcoal relative px-3 py-1.5 transition-colors flex items-center gap-1.5"
              href={navItem.link}
            >
              {navItem.nova && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-lilac-dark" />
              )}
              <span className="relative z-10">{navItem.name}</span>
              {navItem.children && <span className="relative z-10 text-[10px] text-charcoal/45">▾</span>}
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="menu-hover"
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,224,214,0.35) 100%)",
                    boxShadow: "0 4px 15px rgba(28,25,23,0.06)",
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.05 }}
                />
              )}
            </Link>
            {navItem.children && hoveredIndex === idx && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] rounded-[22px] border border-warm-border/70 bg-cream/95 backdrop-blur-xl shadow-[0px_24px_60px_-18px_rgba(28,25,23,0.18)] p-3">
                <div className="space-y-1">
                  {navItem.children.map((child) => (
                    <Link
                      key={child.link}
                      href={child.link}
                      className="block rounded-[16px] px-4 py-3 hover:bg-white transition-colors"
                    >
                      <p className="text-sm font-medium text-charcoal">{child.name}</p>
                      {child.note && <p className="mt-1 text-xs text-charcoal/55">{child.note}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="popLayout" initial={false}>
        {!visible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
          >
            <Button href="/book" variant="primary">
              Get Your Free Audit
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MobileNav = ({ navItems, visible }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(16px)",
        background: visible
          ? "rgba(250, 246, 241, 0.95)"
          : "rgba(250, 246, 241, 0.8)",
        width: visible ? "92%" : "95%",
        y: visible ? 4 : 0,
        borderRadius: open ? "24px" : "9999px",
        padding: "12px 20px",
        boxShadow: visible
          ? "0 10px 30px -10px rgba(28,25,23,0.08)"
          : "0 0 0 transparent",
      }}
      initial={{ width: "95%", scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex relative flex-col lg:hidden w-full justify-between items-center max-w-[calc(100vw-1rem)] mx-auto z-50 border border-warm-border/40"
      )}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <Logo />
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {open ? (
            <IconX
              className="text-charcoal cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-charcoal cursor-pointer"
              onClick={() => setOpen(!open)}
            />
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
            className="flex rounded-2xl absolute top-16 backdrop-blur-xl bg-cream/95 inset-x-0 z-50 flex-col items-start justify-start gap-3 w-full px-6 py-6 shadow-lg border border-warm-border/40"
          >
            {navItems.map((navItem, idx) => (
              <motion.div
                key={`link=${idx}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: idx * 0.05 },
                }}
                whileHover={{ x: 5 }}
                className="w-full"
              >
                <Link
                  href={navItem.link}
                  onClick={() => setOpen(false)}
                  className="relative text-charcoal/90 hover:text-charcoal transition-colors flex items-center gap-2"
                >
                  {navItem.nova && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-lilac-dark" />
                  )}
                  <span className="block">{navItem.name}</span>
                </Link>
                {navItem.children && (
                  <div className="mt-3 ml-4 space-y-2 border-l border-warm-border pl-4">
                    {navItem.children.map((child) => (
                      <Link
                        key={child.link}
                        href={child.link}
                        onClick={() => setOpen(false)}
                        className="block"
                      >
                        <p className="text-sm text-charcoal/80">{child.name}</p>
                        {child.note && <p className="text-xs text-charcoal/50 mt-0.5">{child.note}</p>}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            <Button
              href="/book"
              variant="primary"
              className="w-full mt-2"
            >
              Get Your Free Audit
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
