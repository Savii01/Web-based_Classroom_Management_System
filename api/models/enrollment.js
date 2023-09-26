const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const courseData = require('./courseData');
const userData = require('./userData');

const enrollment = connectdb.define('enrollment', {
  enrollmentID: {
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
  enrollmentDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

enrollment.belongsTo(courseData, { foreignKey: 'courseID' });
enrollment.belongsTo(userData, { foreignKey: 'studentID' });

module.exports = enrollment;
