 const StudentData = require('../data/studentData');
 const{validationResult} = require('express-validator');

 const StuData = {
    createStuData: createStuData,
    findAllStuData: findAllStuData,
    findStuDataById: findStuDataById,
    updateStudentData: updateStudentData,
    deleteById: deleteById,
    deleteAll: deleteAll
 }

 //creating
 function createStuData(req,res){
    const student = req.body;
    StudentData.create( student )
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "Could not create Student data"
        })
    });
 }

 //retrieving

 function findAllStuData(req, res){
    StudentData.findAll()
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "Could not retrieve Student data"
        })
    })
 }

 //retrieving by id

 function findStuDataById(req, res){
    StudentData.findById(req.params.id)
    .then((data)=>{
        res.send(data);
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "  Could not get the Student data"
        })
    })
 }

 //updating

 function updateStudentData(req, res){
    StudentData.updateStudentData(req.body, req.params.id)
    .then((data)=>{
        res.status(200).json({
            message:"student updated successfully",
            StudentData:data
        })
    })
    .catch((error)=>{
        res.status(500).json({
            message:
            error.message || "could not update Student data"
        })
    })
 }

 //deleting by id

 function deleteById(req,res){
    StudentData.deleteById(req.params.id)
    .then((data)=>{
        res.status(200).json({
            message: "Student data has been successfully deleted",
            StudentData: data
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message:
            error.message || "Cannot delete the Stutent data"
        })
    })
 }

 //deleting all data

 function deleteAll(req, res){
    StudentData.destroy({
        where:{},
        truncate:false
    })
    .then((data)=>{
        res.status(200).send({
            message: "All Stuturers data has been successfully deleted",
            StudentData: data
        })
    })
 }

 module.exports = StuData;