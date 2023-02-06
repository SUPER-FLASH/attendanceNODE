const mongoose = require('mongoose');
const { Schema } = mongoose;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps: true})



adminSchema.methods.generateAuthToken = function generateAuthToken() {

    try{
       console.log(this)
       const token = jwt.sign({_id:this._id.toString()},process.env.JWT_KEY)
       return token;

        
    }catch(error){
      console.log(error)
    }
}

adminSchema.pre('save',async function(next){
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

const admin = mongoose.model('admin',adminSchema);

module.exports = admin;