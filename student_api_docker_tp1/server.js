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

const PORT = 3000;

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
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  })
  .catch((err) => {
    console.log("database not connected", err.message);
  });
