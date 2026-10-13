const express = require('express');
const { hexToRgb } = require('./hexToRgb');

const app = express();

// Read JSON request bodies.
app.use(express.json());

/**
 * POST /api/convert
 * Body: { "hex": "#FF0000" }
 * Success: HTTP 200 with { r, g, b }.
 * Invalid input: HTTP 400 with { error }.
 */
app.post('/api/convert', (req, res) => {
  try {
    const rgb = hexToRgb(req.body?.hex);
    return res.status(200).json(rgb);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Return a JSON error for malformed JSON request bodies.
app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must contain valid JSON.' });
  }

  return next(error);
});

// Export the app so integration tests can use it.
module.exports = app;
