const express = require('express');
const router = express.Router();
const Admin = require('../Schema/adminSchema');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { default: axios } = require('axios');
const { check, validationResult } = require("express-validator");
const LeaveRequest = require('../Schema/leaveSchema');



router.post(
  "/",      [check("email").not().isEmpty().withMessage("Email must be provided"), 
                   check("name").not().isEmpty().withMessage("Name must be provided"),
                   check("last_date").not().isEmpty().withMessage("endDate must be provided"),
                   check("from_date").not().isEmpty().withMessage("startDate must be provided"),
                   check("leave_type").not().isEmpty().withMessage("leaveType must be provided"),
                   check("half_day").not().isEmpty().withMessage("halfDay must be provided"),
                   check("reason").not().isEmpty().withMessage("reason must be provided"),
                   check("department").not().isEmpty().withMessage("department must be provided"),
                   check("status").not().isEmpty().withMessage("status must be provided"),
                   check("designation").not().isEmpty().withMessage("designation must be provided"),

              ],
     async (req, res) => {
      console.log("--------------leave----------request------------------------------");
       // Finds the validation errors in this request and wraps them in an object with handy functions
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       // check if email already taken
       try {
  
         const doc = await LeaveRequest.create(req.body);
         res.status(200).send({success:true,message:"Leave Request Submitted Successfully"});
       } catch (err) {
         res.status(500).send("Some error occured");
       }
     }
);

module.exports = router;
