const student = require('../models/studentData');
const StudentData = {
    create: create,
    findAll: findAll,
    findById: findById,
    updateStudentData: updateStudentData,
    deleteById: deleteById,
    deleteAll: deleteAll
}

function create(stuData){
    const StuData = new student(stuData);
    return StuData.save();
}

function findAll(){
    return student.findAll();
}

function findById(StudentID){
    return student.findByPk(StudentID);
}

function updateStudentData(StuData, studentID){
    const updateStudentData = {
        studentID:StuData.studentID,
        fullName: StuData.fullName,
        regNo: StuData.regNo,
        gender:StuData.gender,
        levels:StuData.levels,
        phone: StuData.phone,
        email: StuData.email,
        department: StuData.department
    };
    return student.update(updateStudentData,{where:{studentID: studentID}});
}

function deleteById(studentID){
    return student.destroy({where:{studentID: studentID}})
}

function deleteAll(){
    return student.deleteAll();
}

module.exports = StudentData;