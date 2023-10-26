// src/routes/api.js

const express = require('express');
const router = express.Router();
const scraper = require('../scraper');

// Define an API endpoint for scraping the cybersecurity newsletter
router.get('/scrape-newsletter', async (req, res) => {
  try {
    const newsletterData = await scraper.scrapeNewsletter();
    res.json({ newsletterData });
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});

module.exports = router;
