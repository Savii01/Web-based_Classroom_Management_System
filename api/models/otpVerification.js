const { Sequelize, DataTypes } = require('sequelize');

const User = require('./userData'); // Assuming you have the User model defined in a separate file

const otpVerification = sequelize.define('otpVerification', {
  otpVerificationID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userID',
    },
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Any additional fields related to otpVerification
});

otpVerification.belongsTo(User, { foreignKey: 'userID' }); // Establishing the relationship with User model

module.exports = otpVerification;
