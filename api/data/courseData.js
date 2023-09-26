const course = require('../models/courseData');
const { create, findAll, findById, deleteById, deleteAll } = require('./studentData');
const courseData = {
    create: create,
    findAll: findAll,
    findById: findById,
    updateCourseData: updateCourseData,
    deleteById:deleteById,
    deleteAll:deleteAll
}

function create(crsData){
    const CrsData = new course(crsData);
    return CrsData=save();
}

function findAll(){
    return course.findAll();
}

function findById(courseCode) {
  return course.findOne({
    where: { courseCode: courseCode }
  });
}

function updateCourseData(crsData, courseCode)