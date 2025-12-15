import { motion } from "framer-motion";

export const ChristmasLights = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-20 pointer-events-none overflow-hidden'>
      <div className='flex justify-around'>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='w-3 h-3 rounded-full'
            style={{
              backgroundColor: [
                "#ef4444",
                "#22c55e",
                "#3b82f6",
                "#eab308",
                "#ec4899",
              ][i % 5],
              boxShadow: `0 0 10px ${
                ["#ef4444", "#22c55e", "#3b82f6", "#eab308", "#ec4899"][i % 5]
              }`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
