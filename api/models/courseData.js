const Sequelize = require('sequelize');
const connectdb = require('../ConfigDB/config');

class CourseData extends Sequelize.Model {}

CourseData.init(
  {
    courseID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    courseTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    courseCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isCourseCodeValid(value) {
          if (!/^[A-Za-z]{3}\d+$/.test(value)) {
            throw new Error('Course code should follow the pattern of three alphabetic characters followed by a numeric value.');
          }
        }
      }
    },
    courseDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lecturer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    courseCredit: {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        isCourseCreditValid(value) {
          if (value < 1 || value > 6) {
            throw new Error('Course credit should be between 1 and 6.');
          }
        }
      }
    },
    courseLevel: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 100,
        max: 500
      }
    }
  },
  {
    sequelize: connectdb,
    modelName: 'courseData'
  }
);

module.exports = CourseData;
