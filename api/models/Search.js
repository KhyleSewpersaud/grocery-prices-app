const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SearchSchema = new Schema({
  search: { type: String, required: true },
});

const SearchModel = model("Search", SearchSchema);

module.exports = SearchModel;
