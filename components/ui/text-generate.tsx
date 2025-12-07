"use client";

import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [rendered, setRendered] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!rendered) {
      animate(
        "span",
        { opacity: 1, filter: "blur(0px)" },
        { duration: 0.5, delay: stagger(0.1) }
      );
      setRendered(true);
    }
  }, [scope, animate, rendered]);

  return (
    <motion.div ref={scope} className={cn("font-bold", className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
          style={{ filter: "blur(10px)" }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
};
