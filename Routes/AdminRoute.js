const express = require('express');
const router = express.Router();
const Admin = require('../Schema/adminSchema');
const Employee = require('../Schema/employeeSchema')
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { default: axios } = require('axios');
const { check, validationResult } = require("express-validator");



router.post('/login', auth, async (req, res) => {
  console.log('login page ************************************************************************')
  console.log(req.body)
  console.log(req.headers.cookie)
  const email = req.body.email;
  const passwordUser = req.body.password;
  const response_key = req.body.captchaResponse;
  const secret_key = process.env.CAPTCHA_SECRET_KEY;
  try {
    const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    const captchaResponsereal = await axios.get(captchaUrl)
    console.log(captchaResponsereal.data);
    const captchaResponse = true;
    if (captchaResponsereal.data.success === true) {
      console.log(email, passwordUser, "----------------detail-----------------")
      const adminUser = await Employee.findOne({ email: email });
      if(adminUser === null){
        return res.json({ "success": false, message: "Invalid Credentials" })
      }
      console.log(adminUser);
      const checkPassword = await bcrypt.compare(passwordUser, adminUser.password)
      console.log(checkPassword);


      if (checkPassword) {
        console.log(adminUser);
        const token = await adminUser.generateAuthToken();
        res.cookie("_securepurge", token);
        return res.json({ "success": true, message: "User login successfully" })

       } else {
        return res.send({ success: false, message: "Invalid Credentials" })
       }

      }
      else {
        return res.send({ success: false, message: "Captcha Validation Failed" })
      }
    } catch (error) {
      return res.send({ success: false, message:"Please try again later"})
   }
})

router.get("/logout", auth, async (req, res) => {
  try {
    console.log('logout api=------------------------------------')
    res.clearCookie("_securepurge");
    return res.json({ "success": true, message: "Logout Successfully" })
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/",async (req,res)=>{
    let admin = await Employee.findOne({ email:'abhi@gmail.com' })
    res.json({
      message:"HOME",
      admin: admin.name
    });
  })

router.post(
  "/register",[check("email").not().isEmpty().withMessage("Email must be provided"), 
               check("email").isEmail().withMessage("Email is not valid"),
               check("password").not().isEmpty().withMessage("Password must be provided")
              ],
     async (req, res) => {
       console.log(req.body);
       // Finds the validation errors in this request and wraps them in an object with handy functions
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       // check if email already taken
       try {
         let admin = await Employee.findOne({ email: req.body.email });
         if (admin) {
           return res.status(400).json({ error: "email already taken" });
         }
         admin = await Employee.create({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           image: req.body.password,
           designation:req.body.email,
           address: req.body.email,
           increment: req.body.email,
           joining_date: req.body.email,
           upcoming_increment: req.body.email,
         });
         res.json(admin);
       } catch (err) {
         res.status(500).send("Some error occured");
       }
     }
);

router.post("/change-password", auth, async (req, res) => {
  const password = req.body.old_password;
  const newPassword = req.body.new_password;
  const hashPassword = await bcrypt.hash(newPassword, 10);
  const id = await Employee.findOne({ _id: req.userId });
  const updatePassword = { password: hashPassword };

  if (id) {
    const passwordExist = await bcrypt.compare(password, id.password);
    if (passwordExist) {
      if (req.body.new_password == req.body.confirm_password) {
        const updatedPassword = await Admin.findByIdAndUpdate(
          req.userId,
          updatePassword
        );
        res.clearCookie("jwt");
        res.redirect("/login");
      } else {
        res.render("admin/changePassword", {
          error: "confirm password not match with new password",
        });
      }
    } else {
      res.render("admin/changePassword", {
        error: "password did not match with old password",
      });
    }
  } else {
    res.render("admin/changePassword", { error: "user not exist" });
  }
});

module.exports = router;

