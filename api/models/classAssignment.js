const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const courseData = require('./courseData');

const classAssignment = connectdb.define('classAssignment', {
  assignmentId: {
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
  assignmentTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  instructions: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

classAssignment.belongsTo(courseData, { foreignKey: 'courseID' });

module.exports = classAssignment;
