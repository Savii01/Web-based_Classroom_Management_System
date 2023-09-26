const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const courseData = require('./courseData');
const userData = require('./userData');

const result = connectdb.define('result', {
  resultID: {
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
  studentID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  assessmentType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: false
  }
});

result.belongsTo(courseData, { foreignKey: 'courseID' });
result.belongsTo(userData, { foreignKey: 'studentID' });

module.exports = result;
