const sql = require('../config/config.db');
const Sql = require('sequelize')



const StudentModel = sql.define('Student',{
    id:{
        type:Sql.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    nom:{
        type:Sql.STRING,
        allowNull:false,
    },
    prenom:{
        type:Sql.STRING,
        allowNull:false,
    },
    ville:{
        type:Sql.STRING,
        allowNull:false,
    },
    filiere:{
        type:Sql.STRING,
        allowNull:false,
    },
    total_abs:{
        type:Sql.INTEGER,
        allowNull:false,
        defaultValue:0,
    },
});
module.exports = StudentModel;