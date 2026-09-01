"use client";

import React, {
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type RefObject,
  type ElementType,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  scrub?: number | boolean;
  as?: ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 1.5,
  blurStrength = 3,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom 75%",
  wordAnimationEnd = "bottom 65%",
  scrub = 1,
  as: Component = "div",
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    let text = "";
    if (typeof children === "string") {
      text = children;
    } else if (Array.isArray(children)) {
      text = children.map((c) => (typeof c === "string" ? c : "")).join("");
    }
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "power1.out",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 90%",
            end: rotationEnd,
            scrub: scrub,
          },
        }
      );

      const wordElements = el.querySelectorAll<HTMLElement>(".word");
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity },
          {
            ease: "power1.out",
            opacity: 1,
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 85%",
              end: wordAnimationEnd,
              scrub: scrub,
            },
          }
        );

        if (enableBlur) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "power1.out",
              filter: "blur(0px)",
              stagger: 0.03,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: "top 85%",
                end: wordAnimationEnd,
                scrub: scrub,
              },
            }
          );
        }
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    scrub,
  ]);

  return (
    <Component
      ref={containerRef as any}
      className={`scroll-reveal ${containerClassName}`}
    >
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
};

export default ScrollReveal;
