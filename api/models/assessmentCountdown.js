const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const courseData = require('./courseData');

const assessmentCountdown = connectdb.define('assessmentCountdown', {
  countdownID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  courseID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  assessmentType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  countdownTime: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

assessmentCountdown.belongsTo(courseData, { foreignKey: 'courseID' });

module.exports = assessmentCountdown;
