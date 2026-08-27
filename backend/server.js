const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDist));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(frontendDist, "index.html"));
});

let counter = 0;

app.get("/api/counter", (req, res) => {
  res.json({ count: counter });
});

app.post("/api/increment", (req, res) => {
  counter += 1;
  res.json({ count: counter });
});

app.post("/api/decrement", (req, res) => {
  counter -= 1;
  res.json({ count: counter });
});

app.post("/api/reset", (req, res) => {
  counter = 0;
  res.json({ count: counter });
});

app.listen(PORT, () => {
  console.log(`Counter backend running on http://localhost:${PORT}`);
});
