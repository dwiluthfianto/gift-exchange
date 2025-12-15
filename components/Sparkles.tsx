/* eslint-disable react-hooks/purity */
import { useMemo } from "react";
import { motion } from "framer-motion";

const SPARKLE_COUNT = 10;

export const Sparkles = ({ isAnimating }: { isAnimating: boolean }) => {
  const sparkles = useMemo(() => {
    if (!isAnimating) return [];

    return Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      delay: Math.random() * 0.3,
    }));
  }, [isAnimating]);

  if (!isAnimating) return null;

  return sparkles.map((s) => (
    <motion.div
      key={`sparkle-${s.id}`}
      className='absolute top-1/2 left-1/2 text-3xl'
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: s.x,
        y: s.y,
        opacity: 0,
        rotate: 360,
      }}
      transition={{
        duration: 1.5,
        delay: s.delay,
      }}
    >
      ✨
    </motion.div>
  ));
};
