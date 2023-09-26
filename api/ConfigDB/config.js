const {Sequelize} = require('sequelize');
const mssql =require('mssql')

//connection string
const db = new Sequelize('OnlineClassroom', 'sa', 'savii123', {
  //host: 'Savii\\SQLVER19',   // I removed this and it connected but while it is still there i have the *getaddrinfo error*
  dialect: 'mssql',


  pool:{
    max:7,
    min: 0,
    acquire: 3000,
    idle:1000,
  },

   jwtSecret: 'Savii123', //add your secret code

});


module.exports = db;