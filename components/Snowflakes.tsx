/* eslint-disable react-hooks/purity */
import { motion } from "framer-motion";
import { useMemo } from "react";

export const Snowflakes = () => {
  const snowflakes = useMemo(() => {
    return Array.from({
      length: 30,
    }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 10 + 10}px`,
      opacity: Math.random() * 0.5 + 0.3,
      x: [0, Math.random() * 100 - 50, 0],
      duration: Math.random() * 5 + 8,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <>
      {snowflakes.map((s) => (
        <motion.div
          key={s.id}
          className='absolute text-white pointer-events-none'
          style={{
            left: s.left,
            fontSize: s.fontSize,
            opacity: s.opacity,
          }}
          initial={{ y: -20, rotate: 0 }}
          animate={{
            y: "100vh",
            rotate: 360,
            x: s.x,
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "linear",
          }}
        >
          ❄
        </motion.div>
      ))}
    </>
  );
};
