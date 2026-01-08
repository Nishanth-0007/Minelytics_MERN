import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/Navbar";
import SoilClassifier from "../components/SoilClassifier";
import CO2Predictor from "../components/CO2Predictor";

const Dashboard = () => {
  const [tab, setTab] = useState("soil");

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      <AnimatePresence mode="wait">
        {tab === "soil" ? (
          <SoilClassifier key="soil" />
        ) : (
          <CO2Predictor key="co2" />
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
