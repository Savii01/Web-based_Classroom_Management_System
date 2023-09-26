module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const { check } = require('express-validator');
    const lecturerdata = require('../controllers/lecturerController');

    // creating 
    router.post("/",[
        check('title').isAlpha('en-US', { ignore: " " }),
        check('fullName').isAlpha('en-US', { ignore: " " }),
        check('phone').isAlphanumeric(),
        check('email').isAlphanumeric('en-US', { ignore: "." }),
        check('dept').isAlpha('en-US', { ignore: " " }),
     
    ],
        lecturerdata.createLecData
    );

    //retrieve all
    router.get("/", lecturerdata.findAllLecData);

    // retrieve by id
    router.get("/:id", lecturerdata.findLecDataById);

    // update
    router.put("/:id", lecturerdata.updateLecData);

    // delete by id
    router.delete("/:id", lecturerdata.deleteById);

    // delete all
    router.delete("/", lecturerdata.deleteAll);

    app.use('/api/lecturer', router)
}