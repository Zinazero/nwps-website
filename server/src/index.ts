import app from "./server";

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
