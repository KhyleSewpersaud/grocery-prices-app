const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: false },
  picture: { type: String, required: false },
});

const DataModel = model("Data", DataSchema, "sentData");

module.exports = DataModel;