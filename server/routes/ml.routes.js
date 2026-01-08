const express = require("express");
const multer = require("multer");
const {
  soilPredict,
  co2Predict
} = require("../controllers/ml.controller");

const router = express.Router();
const upload = multer();

router.post("/soil-predict", upload.single("image"), soilPredict);
router.post("/co2-predict", co2Predict);

module.exports = router;
