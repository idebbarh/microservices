const AbsenceModel = require("../models/absenceModel");
const { publish } = require("../rabbitmq/publish");

const createAbsenceController = async (req, res) => {
  try {
    const { studentId, reason } = req.body;
    const newAbsence = new AbsenceModel({ studentId, reason });
    const absenceCreated = await newAbsence.save();
    res.status(201).json({ message: absenceCreated + "absence created" });
    publish("total_absences_maj", JSON.stringify(absenceCreated));
  } catch (err) {
    res.status(500).json({
      error: "absence not created" + err.message,
    });
  }
};

const getAbsencesController = async (_, res) => {
  try {
    const absences = await AbsenceModel.find();
    res.status(200).json({ res: absences });
  } catch (err) {
    res
      .status(500)
      .json({ error: "error on recieving absences" + err.message });
  }
};

module.exports = { createAbsenceController, getAbsencesController };
