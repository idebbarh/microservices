const mongoose = require("mongoose");
const express = require("express");
const {
  createAbsenceController,
  getAbsencesController,
} = require("./controllers/absencesController");
const app = express();

mongoose
  .connect("mongodb://absences-mongodb/absences_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connexion a la base de donnees reussie");
  })
  .catch((err) => {
    console.error("error de la conx a la base de donnees", err);
  });

//routes
app.post("/absences", createAbsenceController);
app.get("/absences", getAbsencesController);
app.listen(4000, () => {
  console.log("listening on 4000");
});
