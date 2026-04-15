const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // ✅ FINAL FIX
      contents: prompt,
    });

    const text = response.text;

    console.log("🔥 RAW AI:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (err) {
    console.log("❌ Gemini Error:", err);

    return {
      disease: "Unknown",
      doctorType: "General Physician",
      severity: "low",
    };
  }
};