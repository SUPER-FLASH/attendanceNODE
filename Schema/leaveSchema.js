const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaveSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true,
    },
    from_date: {
      type: String,
    },
    last_date: {
      type: String,
    },
    half_day: {
      type: String,
      required: true,
    },
    reason:{
        type:String,
    },
    department:{
      type:String,
    },
    designation:{
      type:String,
    },
    status:{
      type:String,
    },
    leave_type:{
      type:String,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave_Request", LeaveSchema);

module.exports = Leave;