const express = require("express");
const cors = require("cors");

const mlRoutes = require("./routes/ml.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", mlRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node server running on http://localhost:${PORT}`);
});
