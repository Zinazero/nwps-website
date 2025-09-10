import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3004;

// API route example
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// In production, serve the built client
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
