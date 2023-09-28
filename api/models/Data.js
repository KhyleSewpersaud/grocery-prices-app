const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = new Schema({
  company: { type: String, required: true },
  name: { type: String, required: false },
  price: { type: String, required: false },
  picture: { type: String, required: false },
});

const DataModel = model("Data", DataSchema, "sentData");

module.exports = DataModel;