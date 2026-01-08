const axios = require("axios");
const FormData = require("form-data");

// ----------------------------
// SOIL PREDICTION
// ----------------------------
exports.soilPredict = async (req, res) => {
  try {
    console.log("📥 Image received:", !!req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: req.file.originalname,
    });

    const response = await axios.post(
      "http://127.0.0.1:5001/predict-soil",
      formData,
      { headers: formData.getHeaders() }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Flask error:", error.response?.data || error.message);
    res.status(500).json({ error: "Soil prediction failed" });
  }
};

// ----------------------------
// CO₂ PREDICTION
// ----------------------------
exports.co2Predict = async (req, res) => {
  try {
    console.log("📥 CO₂ input:", req.body);

    const { fuel, coal } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:5001/predict-co2",
      { fuel, coal }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Flask error:", error.response?.data || error.message);
    res.status(500).json({ error: "CO₂ prediction failed" });
  }
};

exports.co2Trend = async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5001/co2-trend"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Trend data fetch failed" });
  }
};
