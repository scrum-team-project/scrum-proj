const { Schema, model } = require("mongoose");

const pollsterSchema = new Schema({
  id: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: String,
  unique_code: String,
});

module.exports = model("Pollster", pollsterSchema);
