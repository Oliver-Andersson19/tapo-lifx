import 'dotenv/config';
import express from 'express';
import * as tapo from './devices/tapo.js';
import * as lifx from './devices/lifx.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ---- Tapo plug routes ----
// Plugs are identified by IP for now (fine for 1-2 devices; swap for a
// device registry/database once you have more than a couple).

app.get('/plugs/:ip/status', async (req, res) => {
  try {
    const status = await tapo.getPlugStatus(req.params.ip);
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/plugs/:ip/on', async (req, res) => {
  try {
    await tapo.turnPlugOn(req.params.ip);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/plugs/:ip/off', async (req, res) => {
  try {
    await tapo.turnPlugOff(req.params.ip);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- LIFX routes ----

app.get('/lights', (req, res) => {
  res.json(lifx.listLights());
});

app.get('/lights/:id/status', async (req, res) => {
  try {
    const state = await lifx.getLightState(req.params.id);
    res.json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/lights/:id/on', async (req, res) => {
  try {
    await lifx.turnLightOn(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/lights/:id/off', async (req, res) => {
  try {
    await lifx.turnLightOff(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Smart home starter API is running' });
});

lifx.startLifxDiscovery();

app.listen(PORT, () => {
  console.log(`Smart home starter API listening on http://localhost:${PORT}`);
});
