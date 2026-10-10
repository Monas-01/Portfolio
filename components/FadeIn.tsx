"use client";

import { LazyMotion, m } from "motion/react";
import { ReactNode } from "react";

const loadFeatures = () =>
  import("motion/react").then((res) => res.domAnimation);

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: FadeInProps) {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
