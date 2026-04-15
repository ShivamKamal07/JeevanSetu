const express = require("express");
const router = express.Router();
const { analyzeSymptoms } = require("../services/symptomService");

router.post("/analyze", async (req, res) => {
  const { symptoms } = req.body;

  const result = await analyzeSymptoms(symptoms);

  res.json(result);
});

module.exports = router;