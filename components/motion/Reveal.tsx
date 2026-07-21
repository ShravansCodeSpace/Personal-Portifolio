"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02
    }
  }
};

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export const MotionArticle = motion.article;
export const MotionDiv = motion.div;
