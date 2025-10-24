import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.production' : '.env'),
});

import app from './server';

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
