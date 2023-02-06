const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
        type: String,
        required: true,
      },
    work_anniversary: {
        type: String,
        required: true,
      },
    birthday: {
        type: String,
        required: true,
      },
},
  { timestamps: true }
);
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
