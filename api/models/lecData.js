const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const CourseData = require('./courseData');

const lecData = connectdb.define('lecData', {
  lecturerID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, primaryKey:true, allowNull: false },
  fullName: { type: Sequelize.STRING, primaryKey:true, allowNull: false },
  // gender: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique:true },
  dept: { type: Sequelize.STRING, allowNull: false },
});

// Define association between lecturerData and courseData
lecData.belongsToMany(CourseData, { through: 'LecturerCourse', foreignKey: 'lecturerID' });
CourseData.belongsToMany(lecData, { through: 'LecturerCourse', foreignKey: 'courseID' });

// Synchronize the model with the database
lecData.sync();

module.exports = lecData;
