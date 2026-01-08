import { motion } from "framer-motion";

interface Props {
  tab: string;
  setTab: (tab: string) => void;
}

const Navbar = ({ tab, setTab }: Props) => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center px-8 py-4 bg-slate-900 shadow-lg"
    >
      <h1 className="text-2xl font-bold text-emerald-400">
        🌍 Minelytics
      </h1>

      <div className="relative flex gap-4">
        {["soil", "co2"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`relative px-5 py-2 rounded-lg font-medium ${
              tab === item
                ? "text-black"
                : "text-white hover:text-emerald-300"
            }`}
          >
            {tab === item && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-emerald-400 rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {item === "soil" ? "🌱 Soil Classifier" : "📈 CO₂ Predictor"}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default Navbar;
