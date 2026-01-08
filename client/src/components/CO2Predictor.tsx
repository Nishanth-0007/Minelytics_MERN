import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";

const CO2Predictor = () => {
  const [fuel, setFuel] = useState(1000);
  const [coal, setCoal] = useState(5000);
  const [result, setResult] = useState<number | null>(null);

  const predict = async () => {
    const res = await api.post("/co2-predict", { fuel, coal });
    setResult(res.data.predicted_co2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto mt-12 bg-slate-900 p-6 rounded-2xl shadow-2xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-emerald-400">
        📈 CO₂ Emission Predictor
      </h2>

      <input
        type="number"
        value={fuel}
        onChange={(e) => setFuel(+e.target.value)}
        className="w-full mb-3 p-2 bg-slate-800 rounded"
        placeholder="Fuel Used"
      />

      <input
        type="number"
        value={coal}
        onChange={(e) => setCoal(+e.target.value)}
        className="w-full mb-4 p-2 bg-slate-800 rounded"
        placeholder="Coal Mined"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={predict}
        className="w-full py-2 bg-emerald-500 text-black rounded-lg font-semibold"
      >
        Predict CO₂
      </motion.button>

      {result && (
        <motion.h3
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 text-2xl text-center font-bold text-emerald-300"
        >
          🌍 {result.toFixed(2)} kg CO₂
        </motion.h3>
      )}
    </motion.div>
  );
};

export default CO2Predictor;
