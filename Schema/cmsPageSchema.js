const mongoose = require("mongoose");
const { Schema } = mongoose;

const CmsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);

const Cmspage = mongoose.model("Cmspage", CmsSchema);

module.exports = Cmspage;
