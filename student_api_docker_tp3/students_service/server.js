const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql = require("./config/config.db");
const {
  getAllStudents,
  getStudentById,
  addNewStudent,
  updateStudent,
  deleteStudent,
} = require("./controller/student");
const consumeMessage = require("./rabbitmq/consumer");

const PORT = 9001;
const queueName = "total_absences_maj";

app.use(bodyParser.json());
app.get("/api/students", getAllStudents);
app.get("/api/students/:id", getStudentById);
app.post("/api/students", addNewStudent);
app.put("/api/students/:id", updateStudent);
app.delete("/api/students/:id", deleteStudent);

async function connectToDB() {
  await sql.sync();
}

connectToDB()
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
      consumeMessage(queueName);
    });
  })
  .catch((err) => {
    console.log("database not connected", err);
  });
