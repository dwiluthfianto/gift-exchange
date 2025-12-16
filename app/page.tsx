"use client";
import { ChristmasLights } from "@/components/ChristmasLights";
import { Snowflakes } from "@/components/Snowflakes";
import { Sparkles } from "@/components/Sparkles";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase
        .from("gift_exchange_state")
        .select("total_participants")
        .eq("id", "default")
        .single();

      if (error || !data) {
        setError("Permainan belum diatur oleh admin");
      }

      setLoading(false);
    };

    init();
  }, []);

  const registerUser = async () => {
    if (!userNumber || userNumber < 1) {
      setError("Nomor tidak valid");
      return;
    }

    const { data, error } = await supabase.rpc("register_user_number", {
      p_user_number: userNumber,
    });

    if (error || !data) {
      setError("Nomor sudah terdaftar");
      return;
    }

    setIsRegistered(true);
  };

  const pickNumber = async () => {
    setIsAnimating(true);
    setShowGift(true);

    setTimeout(async () => {
      const { data, error } = await supabase.rpc("take_random_gift_for_user", {
        p_user_number: userNumber,
      });

      if (error) {
        setError(error.message);
        setIsAnimating(false);
        setShowGift(false);
        return;
      }

      setSelectedNumber(data);
      setIsAnimating(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-950 via-green-950 to-slate-900 flex items-center justify-center'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className='text-6xl'
        >
          🎄
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-950 via-green-950 to-slate-900 relative overflow-hidden p-4'>
      <Snowflakes />
      <ChristmasLights />

      <div className='max-w-md mx-auto py-8 relative z-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center mb-8'
        >
          <motion.div
            className='text-6xl mb-4'
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎁
          </motion.div>
          <h1 className='text-4xl font-bold text-white mb-2 drop-shadow-lg'>
            Gift Exchange
          </h1>
          <p className='text-emerald-300'>Ambil nomor tukar kado Anda</p>
        </motion.div>

        {!isRegistered ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl'
          >
            <h2 className='text-2xl font-bold text-white mb-6 text-center'>
              Masukkan Nomor Anda
            </h2>
            <input
              type='number'
              value={userNumber}
              onChange={(e) => setUserNumber(parseInt(e.target.value))}
              onKeyPress={(e) => e.key === "Enter" && registerUser()}
              placeholder='Nomor peserta'
              className='w-full bg-white/10 text-white text-center text-2xl placeholder-white/50 px-4 py-4 rounded-xl border border-white/30 focus:border-emerald-400 focus:outline-none mb-4 backdrop-blur-sm'
            />
            {error && (
              <p className='text-red-300 text-sm mb-4 text-center'>{error}</p>
            )}
            <button
              onClick={registerUser}
              className='w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition'
            >
              🎄 Daftar
            </button>
          </motion.div>
        ) : selectedNumber === null ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center'
          >
            <motion.h2
              className='text-2xl font-bold text-white mb-2'
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Selamat Datang! 🎉
            </motion.h2>
            <div className='inline-block bg-gradient-to-r from-red-500 to-green-500 text-white text-3xl font-bold px-6 py-2 rounded-xl mb-6'>
              Nomor {userNumber}
            </div>
            <p className='text-emerald-300 mb-8 text-lg'>
              Klik kado untuk mengambil nomor tukar kado
            </p>

            <div className='flex justify-center mb-6'>
              <AnimatePresence>
                {showGift ? (
                  <motion.div
                    className='relative'
                    style={{ width: 200, height: 200 }}
                  >
                    <motion.div
                      initial={{ scale: 1, rotate: 0 }}
                      animate={{
                        scale: [1, 1.15, 1.2, 0],
                        rotate: [0, -5, 5, -5, 5, 180],
                        opacity: [1, 1, 1, 0],
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className='absolute inset-0'
                    >
                      <div className='w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl relative shadow-2xl'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='w-3 h-full bg-yellow-300 rounded-full'></div>
                        </div>
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <div className='h-3 w-full bg-yellow-300 rounded-full'></div>
                        </div>
                        <div className='absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                          <div className='w-20 h-12 bg-yellow-300 rounded-full'></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Fireworks Effect */}
                    {isAnimating &&
                      [...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className='absolute top-1/2 left-1/2'
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((i * 18 * Math.PI) / 180) * 180,
                            y: Math.sin((i * 18 * Math.PI) / 180) * 180,
                            opacity: 0,
                            scale: [1, 2, 0],
                          }}
                          transition={{ duration: 1.8, ease: "easeOut" }}
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              [
                                "bg-red-400",
                                "bg-green-400",
                                "bg-yellow-400",
                                "bg-blue-400",
                                "bg-pink-400",
                              ][i % 5]
                            }`}
                            style={{
                              boxShadow: `0 0 10px ${
                                [
                                  "#f87171",
                                  "#4ade80",
                                  "#fbbf24",
                                  "#60a5fa",
                                  "#f472b6",
                                ][i % 5]
                              }`,
                            }}
                          ></div>
                        </motion.div>
                      ))}

                    {/* Sparkles */}
                    {isAnimating && <Sparkles isAnimating={isAnimating} />}
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={pickNumber}
                    className='w-48 h-48 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl relative shadow-2xl'
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(239, 68, 68, 0.6)",
                        "0 0 50px rgba(34, 197, 94, 0.6)",
                        "0 0 30px rgba(239, 68, 68, 0.6)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='w-3 h-full bg-yellow-300 rounded-full'></div>
                    </div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='h-3 w-full bg-yellow-300 rounded-full'></div>
                    </div>
                    <div className='absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                      <div className='w-20 h-12 bg-yellow-300 rounded-full'></div>
                    </div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <motion.span
                        className='text-white text-6xl'
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        🎁
                      </motion.span>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {error && <p className='text-red-300 text-sm'>{error}</p>}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center'
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1, repeat: 3 }}
              className='text-7xl mb-6'
            >
              🎉
            </motion.div>
            <h2 className='text-3xl font-bold text-white mb-4'>Selamat!</h2>
            <p className='text-emerald-300 mb-6 text-lg'>
              Anda mendapat nomor:
            </p>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                textShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.8)",
                  "0 0 40px rgba(34, 197, 94, 0.8)",
                  "0 0 20px rgba(239, 68, 68, 0.8)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className='text-8xl font-bold bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 bg-clip-text text-transparent mb-8'
            >
              {selectedNumber}
            </motion.div>
            <div className='bg-gradient-to-r from-red-600/30 to-green-600/30 border border-white/30 rounded-2xl p-6 backdrop-blur-sm'>
              <p className='text-white text-lg'>
                🎁 Silahkan ambil kado Anda <br />
                <span className='text-yellow-300 font-bold text-2xl'>
                  Nomor {selectedNumber}
                </span>
              </p>
            </div>

            {/* Celebration elements */}
            <div className='mt-6 flex justify-center gap-3 text-4xl'>
              {["🎄", "⛄", "🎅", "🎁", "✨"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
