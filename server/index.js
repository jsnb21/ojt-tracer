const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// POST /api/search { username: "..." }
app.post('/api/search', (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(400).json({ error: 'username required' });

  const sherlockPath = path.join(__dirname, 'vendor', 'sherlock-js', 'index.js');
  if (!fs.existsSync(sherlockPath)) {
    return res.status(500).json({
      error: 'Sherlock.js not found. Clone https://github.com/GitSquared/sherlock-js into server/vendor/sherlock-js.'
    });
  }

  const runner = spawn(process.execPath, [
    sherlockPath,
    '--json',
    '--only-found',
    '--name',
    username
  ]);

  let out = '';
  let err = '';
  runner.stdout.on('data', (d) => { out += d.toString(); });
  runner.stderr.on('data', (d) => { err += d.toString(); });

  runner.on('close', (code) => {
    if (code !== 0) return res.status(500).json({ code, error: err || out });
    try {
      const parsed = JSON.parse(out);
      res.json({ result: parsed });
    } catch (parseErr) {
      res.status(500).json({ error: 'Failed to parse Sherlock.js output', raw: out, details: parseErr.message });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
