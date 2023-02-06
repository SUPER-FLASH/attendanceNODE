const mongoose = require("mongoose");
const { Schema } = mongoose;
var jwt = require('jsonwebtoken');


const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password:{
      type: String,
    },
    designation: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    increment: {
      type: String,
    },
    joining_date: {
      type: String,
    },
    upcoming_increment: {
      type: String,
    },
  },
  { timestamps: true }
);

EmployeeSchema.methods.generateAuthToken = function generateAuthToken() {

  try{
     console.log(this)
     const token = jwt.sign({_id:this._id.toString()},process.env.JWT_KEY)
     return token;

      
  }catch(error){
    console.log(error)
  }
}

EmployeeSchema.pre('save',async function(next){
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
