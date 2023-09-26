const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');

const userData = connectdb.define('userData', {
  userID: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull: false,
    unique: true
  },
  regNo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  userPassword: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull: false,
  }
},

);


module.exports = userData;
