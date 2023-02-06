const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Employee = require('../Schema/employeeSchema');
const { check, validationResult } = require("express-validator");
// var mongoose = require('mongoose');  used for converting string to objectId




router.get('/profile-data',auth,async (req,res)=>{

    console.log('-------------------------------------P R O F I L E  R O U T E ---------------------------------------------------------')
    const token = req.cookies._securepurge;
    // console.log(profile);
    const EmployeeData = await Employee.findById(req.userId);
    
    console.log(EmployeeData);
    res.send({profile:EmployeeData});

})



// router.post('profile-data',auth,[check("email").not().isEmpty().withMessage("Email must be provided"), check("password").isEmail().withMessage("Password must be provided")],async ()=>{

//     const errors = validationResult(req);
    
//     if(!errors.isEmpty())
//     {

//     }
//     else{

//     }




// })

module.exports = router;