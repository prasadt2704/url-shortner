const mongoose = require("mongoose");

function connectToMongoDB() {
  //create a new db
  return mongoose.connect("mongodb://127.0.0.1:27017/urlShortner");
}

module.exports = { connectToMongoDB };
