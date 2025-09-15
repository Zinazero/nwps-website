import express from 'express';
import path from 'path';
import parksRouter from './routes/parks';

const app = express();
const PORT = process.env.PORT || 3004;

if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientDistPath));

  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use('/api/parks', parksRouter);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
