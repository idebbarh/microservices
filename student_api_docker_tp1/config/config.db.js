const Sql = require("sequelize");
const sql = new Sql("student_api", "root", "root", {
  /* host: "host.docker.internal", */
  host: "192.168.1.106",
  dialect: "mysql",
});
module.exports = sql;
