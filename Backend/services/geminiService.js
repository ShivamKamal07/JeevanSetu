const axios = require("axios");

exports.analyzeSymptomsAI = async (symptoms) => {
  try {
    const prompt = `
You are a medical assistant.

User symptoms: ${symptoms.join(", ")}

Return ONLY valid JSON:

{
  "disease": "string",
  "doctorType": "General Physician or Cardiologist or Neurologist or Dentist",
  "severity": "low or medium or high"
}
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 200
        }
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    console.log("🔥 RAW AI:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (err) {
    console.log("❌ Gemini REST Error:", err.response?.data || err.message);

    return null; // ⚠️ important change
  }
};