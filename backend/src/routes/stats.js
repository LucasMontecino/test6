const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');
const { mean } = require('../utils/stats');

let cachedStats = null;
let lastModifiedTime = 0;

fs.watchFile(DATA_PATH, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    cachedStats = null;
    lastModifiedTime = Date.now();
    console.log('[Cache] Stats cache invalidated due to file change');
  }
});

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
    if (cachedStats) {
      return res.status(200).json({ ...cachedStats, cached: true });
    }

    const raw = await fs.promises.readFile(DATA_PATH, { encoding: 'utf-8' });
    const items = JSON.parse(raw);

    const total = items.length;
    const averagePrice = mean(items.map((item) => item.price));

    cachedStats = { total, averagePrice };

    res.status(200).json({ ...cachedStats, cached: false });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
