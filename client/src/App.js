import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const doSearch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const r = await axios.post('http://localhost:5000/api/search', { username });
      setResult(r.data.result || r.data);
    } catch (e) {
      setResult({ error: e.response?.data?.error || e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: 24 }}>
      <Paper style={{ padding: 20 }} elevation={6}>
        <Typography variant="h5" gutterBottom>OJT Tracer — Username Search</Typography>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <TextField fullWidth label="Username or name" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <Button variant="contained" onClick={doSearch} disabled={loading || !username}>Search</Button>
        </div>
        <Typography variant="subtitle1">Result</Typography>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f8fa', padding: 12 }}>
          {result ? JSON.stringify(result, null, 2) : 'No results yet.'}
        </pre>
      </Paper>
    </Container>
  );
}
