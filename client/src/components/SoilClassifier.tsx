import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";

const SoilClassifier = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    const res = await api.post("/soil-predict", formData);
    setResult(res.data);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto mt-12 bg-slate-900 p-6 rounded-2xl shadow-2xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-emerald-400">
        🌱 Soil Classification
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setImage(file || null);
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="mb-4"
      />

      {preview && (
        <motion.img
          src={preview}
          alt="preview"
          className="w-full h-48 object-cover rounded-xl mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={predict}
        className="w-full py-2 bg-emerald-500 text-black rounded-lg font-semibold"
      >
        {loading ? "Analyzing..." : "Predict Soil"}
      </motion.button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <h3 className="text-lg font-bold text-emerald-300">
            Soil: {result.soil}
          </h3>

          <ul className="mt-2 space-y-1">
            {result.plants.map((p: string, i: number) => (
              <motion.li
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-slate-300"
              >
                🌿 {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SoilClassifier;
