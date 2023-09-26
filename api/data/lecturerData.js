const lecturer = require('../models/lecData');
const lecturerData = {
    create: create,
    findAll: findAll,
    findById: findById,
    updateLecturerData: updateLecturerData,
    deleteById: deleteById,
    deleteAll: deleteAll
}

function create(lecData){
    const LecData = new lecturer(lecData);
    return LecData.save();
}

function findAll(){
    return lecturer.findAll();
}

function findById(lecturerID){
    return lecturer.findByPk(lecturerID);
}

function updateLecturerData(lecData, lecturerID){
    const updateLecturerData = {
        lecturerID:lecData.lecturerID,
        title:lecData.title,
        fullName: lecData.fullName,
        phone: lecData.phone,
        email: lecData.email,
        dept: lecData.dept
    };
    return lecturer.update(updateLecturerData,{where:{lecturerID: lecturerID}});
}

function deleteById(lecturerID){
    return lecturer.destroy({where:{lecturerID: lecturerID}})
}

function deleteAll(){
    return lecturer.deleteAll();
}

module.exports = lecturerData;