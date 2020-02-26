const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SessionSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  radar_id: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  },
  function_type: {
    type: String,
    required: true
  },
  file_location: {
	  type: String,
	  required: true
  },
  timestamp: {
	  type: String,
	  required: true
  }
});

module.exports = Session = mongoose.model("sessions", SessionSchema);