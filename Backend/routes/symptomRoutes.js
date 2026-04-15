const express = require("express");
const router = express.Router();
const { analyze } = require("../controllers/symptomController");

router.post("/analyze", analyze);
// router.post("/analyze", async (req, res) => {
//   const { symptoms } = req.body;

//   const result = await analyzeSymptoms(symptoms);

//   res.json(result);
// });

module.exports = router;