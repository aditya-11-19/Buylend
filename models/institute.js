const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InstituteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email_format: {
    type: String,
    required: true
  },
  reister_user_name: {
    type: String,
    required: true
  },
  user_designation:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Institute = mongoose.model('institute', InstituteSchema);
