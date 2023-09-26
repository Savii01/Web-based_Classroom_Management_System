 const LecturerData = require('../data/lecturerData');
 const{validationResult} = require('express-validator');

 const LecData = {
    createLecData: createLecData,
    findAllLecData: findAllLecData,
    findLecDataById: findLecDataById,
    updateLecData: updateLecData,
    deleteById: deleteById,
    deleteAll: deleteAll
 }

 //creating
 function createLecData(req,res){
    const lecturer  = req.body;
    LecturerData.create(lecturer)
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "Could not create lecturer data"
        })
    });
 }

 //retrieving

 function findAllLecData(req, res){
    LecturerData.findAll()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "Could not retrieve lecturers data"
        })
    })
 }

 //retrieving by id

 function findLecDataById(req, res){
    LecturerData.findById(req.params.id)
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "  Could not get the lecturer data"
        })
    })
 }

 //uupdating

 function updateLecData(req, res){
    LecturerData.updateLecData(req.body, req.params.id)
    .then((data)=>{
        res.status(200).json({
            message:"Leturer is updated successfully",
            lecturerData:data
        })
    })
    .catch((error)=>{
        res.status(500).json({
            message:
            error.message || "could not update lecturer data"
        })
    })
 }

 //deleting by id

 function deleteById(req,res){
    LecturerData.deleteById(req.params.id)
    .then((data)=>{
        res.status(200).json({
            message: "Lecturer data has been successfully deleted",
            lecturerData: data
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "Cannot delete the lecturer data"
        })
    })
 }

 //deleting all data

 function deleteAll(req, res){
    LecturerData.destroy({
        where:{},
        truncate:false
    })
    .then((data)=>{
        res.status(200).send({
            message: "All lecturers data has been successfully deleted",
            lecturerData: data
        })
    })
 }

 module.exports = LecData;