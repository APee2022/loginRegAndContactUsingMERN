// const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");
// we can also import mongoose like that in this case
// we don't need to write mongoose.Schema and mongoose.model, instead
// of this we direct use Schema and model

// Schema
const contactSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Model or collection
const Contact = new model("Contact", contactSchema);

module.exports = Contact;
