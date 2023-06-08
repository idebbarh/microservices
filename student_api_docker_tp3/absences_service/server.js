const mongoose = require("mongoose");
const express = require("express");
const {
  createAbsenceController,
  getAbsencesController,
} = require("./controllers/absencesController");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
//routes
app.post("/absences", createAbsenceController);
app.get("/absences", getAbsencesController);

const init = async () => {
  try {
    await mongoose.connect("mongodb://absences_mongodb:27017/absences_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connexion a la base de donnees reussie");
    app.listen(4000, () => {
      console.log("listening on 4000");
    });
  } catch (err) {
    console.error("error de la conx a la base de donnees", err);
  }
};

init();
