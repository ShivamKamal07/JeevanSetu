const Doctor = require("../models/doctor");
const { analyzeSymptomsAI } = require("../services/geminiService");

//Normalize doctor type
const normalizeSpecialization = (type = "") => {
  const t = type.toLowerCase();

  if (t.includes("physician") || t.includes("general")) {
    return "general physician";
  }
  if (t.includes("cardio") || t.includes("heart")) {
    return "cardiologist";
  }
  if (t.includes("neuro") || t.includes("brain")) {
    return "neurologist";
  }
  if (t.includes("dent")) {
    return "dentist";
  }

  return t;
};

exports.analyze = async (req, res) => {
  try {
    const { symptoms } = req.body;

    //Validation
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({
        message: "Please provide symptoms array",
      });
    }

    //AI Analysis
    let aiResult = await analyzeSymptomsAI(symptoms);

    console.log("AI RESULT:", aiResult);

    //Fallback if AI fails
    if (!aiResult || !aiResult.doctorType) {
      aiResult = {
        disease: "Unknown",
        doctorType: "General Physician",
        severity: "low",
      };
    }

    //Normalize doctor type
    const normalizedType = normalizeSpecialization(aiResult.doctorType);

    console.log(" Normalized Type:", normalizedType);

    //Fetch doctors (case-insensitive)
    let doctors = await Doctor.find({
      specialization: {
        $regex: normalizedType,
        $options: "i",
      },
    });

    console.log("Found Doctors:", doctors.length);

    //Fallback: if no doctor found → show all doctors
    if (doctors.length === 0) {
      console.log("⚠️ No matching doctors, returning all doctors");

      doctors = await Doctor.find();
    }

    //Emergency flag
    const isEmergency = aiResult.severity === "high";

    //Final response
    res.json({
      disease: aiResult.disease,
      doctorType: aiResult.doctorType,
      severity: aiResult.severity,
      isEmergency,
      doctors,
    });

  } catch (err) {
    console.log(" Error in analyze:", err);
    res.status(500).json({
      message: "Error analyzing symptoms",
    });
  }
};