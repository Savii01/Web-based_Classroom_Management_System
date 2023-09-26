const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const courseData = require('./courseData');

const gradingCriteria = connectdb.define('gradingCriteria', {
  criteriaID: {
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
  assessmentComponent: {
    type: Sequelize.STRING,
    allowNull: false
  },
  scores: {
    type: Sequelize.DECIMAL(5, 2),
    allowNull: false
  }
});

gradingCriteria.belongsTo(courseData, { foreignKey: 'courseID' });

module.exports = gradingCriteria;
