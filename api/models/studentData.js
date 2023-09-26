const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const CourseData = require('./courseData');
const lecData = require('./lecData');

const studentData = connectdb.define('studentData', {
  studentID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: Sequelize.STRING, allowNull: false },
  regNo: { type: Sequelize.STRING, allowNull: false },
  gender: { type: Sequelize.STRING, allowNull: false },
  levels: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique:true },
  department: { type: Sequelize.STRING, allowNull: false },
});

studentData.belongsToMany(CourseData, { through: 'studentCourse', foreignKey: 'lecturerID' });
CourseData.belongsToMany(studentData, { through: 'studentCourse', foreignKey: 'courseID' });
// studentData.belongsToMany(lecturerData,{through: 'courseData', foreignKey:'lecturerID'});
// lecturerData.belongsToMany(studentData ,{through: 'courseData', foreignKey: ''})
// Synchronize the model with the database
studentData.sync();

module.exports = studentData;