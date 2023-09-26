const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');
const CourseData = require('./courseData');

class ScheduledTeachingSession extends Sequelize.Model {}

ScheduledTeachingSession.init(
  {
    sessionID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    courseCode: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    days: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false
    }
  },
  {
    sequelize: connectdb,
    modelName: 'scheduledTeachingSession'
  }
);

ScheduledTeachingSession.belongsTo(CourseData, { foreignKey: 'courseCode' });

module.exports = ScheduledTeachingSession;
