"use client";
import { motion } from "framer-motion";
import { Snowflakes } from "../../components/Snowflakes";
import { ChristmasLights } from "../../components/ChristmasLights";
import { useState } from "react";

interface GameState {
  totalParticipants: number;
  registeredUsers: number[];
  takenNumbers: number[];
}

function PageAdmin() {
  const [error, setError] = useState("");
  const [totalParticipants, setTotalParticipants] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const setupGame = async () => {
    if (
      !totalParticipants ||
      isNaN(parseInt(totalParticipants)) ||
      parseInt(totalParticipants) < 2
    ) {
      setError("Jumlah peserta minimal 2 orang");
      return;
    }

    try {
      const state: GameState = {
        totalParticipants: parseInt(totalParticipants),
        registeredUsers: [],
        takenNumbers: [],
      };

      await window.localStorage.setItem(
        "gift-exchange-state",
        JSON.stringify(state)
      );
      alert("Permainan berhasil diatur!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Gagal mengatur permainan");
    }
  };

  const resetGame = async () => {
    if (window.confirm("Reset semua data permainan?")) {
      try {
        await window.localStorage.removeItem("gift-exchange-state");
        alert("Permainan berhasil direset");
        setTotalParticipants("");
      } catch (err) {
        console.error(err);
        setError("Gagal mereset");
      }
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "Mostrans123!") {
      setIsAdminAuth(true);
      setError("");
    } else {
      setError("Password salah");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-950 via-green-950 to-slate-900 relative overflow-hidden p-4'>
      <Snowflakes />
      <ChristmasLights />

      <div className='max-w-2xl mx-auto py-8 relative z-10'>
        {!isAdminAuth ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl'
          >
            <div className='text-center mb-6'>
              <div className='text-5xl mb-3'>🎅</div>
              <h2 className='text-3xl font-bold text-white'>Admin Login</h2>
            </div>
            <input
              type='password'
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
              placeholder='Masukkan password'
              className='w-full bg-white/10 text-white placeholder-white/50 px-4 py-4 rounded-xl border border-white/30 focus:border-emerald-400 focus:outline-none mb-4 backdrop-blur-sm'
            />
            {error && (
              <p className='text-red-300 text-sm mb-4 text-center'>{error}</p>
            )}
            <button
              onClick={handleAdminLogin}
              className='w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition'
            >
              Login
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-6'
          >
            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='text-4xl'>🎄</span>
                <h2 className='text-2xl font-bold text-white'>
                  Pengaturan Permainan
                </h2>
              </div>
              <div className='space-y-4'>
                <div>
                  <label className='text-emerald-300 text-sm mb-2 block font-semibold'>
                    Jumlah Peserta
                  </label>
                  <input
                    type='number'
                    value={totalParticipants}
                    onChange={(e) => setTotalParticipants(e.target.value)}
                    placeholder='Contoh: 20'
                    className='w-full bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-xl border border-white/30 focus:border-emerald-400 focus:outline-none backdrop-blur-sm'
                  />
                </div>
                {error && <p className='text-red-300 text-sm'>{error}</p>}
                <button
                  onClick={setupGame}
                  className='w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition'
                >
                  ✨ Atur Permainan
                </button>
              </div>
            </div>

            <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 shadow-2xl'>
              <div className='flex items-center gap-3 mb-4'>
                <span className='text-3xl'>⚠️</span>
                <h2 className='text-2xl font-bold text-white'>Danger Zone</h2>
              </div>
              <p className='text-red-300 text-sm mb-4'>
                Reset akan menghapus semua data permainan dan peserta
              </p>
              <button
                onClick={resetGame}
                className='w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition'
              >
                🔄 Reset Permainan
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default PageAdmin;
