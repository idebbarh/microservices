const Sql = require("sequelize");
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.PORT
const sql = new Sql(database,user,password,{host:host,dialect:'mysql'});
module.exports = sql;