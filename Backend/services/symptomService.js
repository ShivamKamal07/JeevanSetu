const Doctor = require("../models/doctor");

const symptomMap = [
  {
    symptoms: ["fever", "cough"],
    disease: "Flu",
    doctorType: "General Physician"
  },
  {
    symptoms: ["chest pain"],
    disease: "Heart Issue",
    doctorType: "Cardiologist"
  }
];

const getNextAvailableDay = () => {
  const days = ["Monday", "Tuesday", "Wednesday"];
  return days[Math.floor(Math.random() * days.length)];
};

exports.analyzeSymptoms = async (inputSymptoms) => {
  const match = symptomMap.find(entry =>
    entry.symptoms.some(sym => inputSymptoms.includes(sym))
  );

  if (!match) {
    return { message: "No match found" };
  }

  const doctors = await Doctor.find({
    specialization: match.doctorType
  });

  const enrichedDoctors = doctors.map(doc => ({
    ...doc._doc,
    nextAvailableDay: getNextAvailableDay()
  }));

  return {
    disease: match.disease,
    doctorType: match.doctorType,
    doctors : enrichedDoctors
  };
};