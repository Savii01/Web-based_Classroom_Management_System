const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const courseData = require('./courseData');
const userData = require('./userData');

const materialData = connectdb.define('materialData', {
  materialID: {
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
  uploaderID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nameOfFile: {
    type: Sequelize.STRING,
    allowNull: false
  },
  filepath: {
    type: Sequelize.STRING,
    allowNull: false
  },
  uploadedDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

materialData.belongsTo(courseData, { foreignKey: 'courseID' });
materialData.belongsTo(userData, { foreignKey: 'uploaderID' });

module.exports = materialData;
