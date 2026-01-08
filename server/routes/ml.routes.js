const express = require("express");
const multer = require("multer");
const {
  soilPredict,
  co2Predict,
  co2Trend
} = require("../controllers/ml.controller");

const router = express.Router();
const upload = multer();

router.post("/soil-predict", upload.single("image"), soilPredict);
router.post("/co2-predict", co2Predict);
router.get("/co2-trend", co2Trend);


module.exports = router;
