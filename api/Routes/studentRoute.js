module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const { check } = require('express-validator');
    const studentdata = require('../controllers/studentController');

    // creating 
    router.post("/",[
        check ('regNo').isAlpha('en-US', {ignore: "/"}),
        check('fullName').isAlpha('en-US', { ignore: " " }),
        check('gender').isAlpha('en-US'),
        // check('dateOfBirth').isAlphanumeric('en-US', { ignore: "-" }),
        check('levels').isAlphanumeric('en-US',{ignore:" "}),
        check('phone').isAlphanumeric(),
        check('email').isAlphanumeric('en-US', { ignore: "." }),
        check('department').isAlpha('en-US', { ignore: " " }),
    ],
        studentdata.createStuData
    );

    //retrieve all
    router.get("/", studentdata.findAllStuData);

    // retrieve by id
    router.get("/:id", studentdata.findStuDataById);

    // update
    router.put("/:id", studentdata.updateStudentData);

    // delete by id
    router.delete("/:id", studentdata.deleteById);

    // delete all
    router.delete("/", studentdata.deleteAll);

    app.use('/api/student', router)
}