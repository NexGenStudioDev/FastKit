import express from 'express';
const app = express();
import { fastKitConfig, setup_FastKit_EnvFiles } from './FastKit';

// In src/index.ts

setup_FastKit_EnvFiles();

const FastKit = new fastKitConfig(app);

FastKit.get('/api', (req, res) => {
  res.send('FastKit API is running!');
});

FastKit.listen(3000, () => {
  console.log('FastKit server is running on http://localhost:3000');
});
