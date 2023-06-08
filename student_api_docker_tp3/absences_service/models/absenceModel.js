const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema({
  studentId: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  reason: String,
});

module.exports = mongoose.model("AbsenceModel", absenceSchema);
