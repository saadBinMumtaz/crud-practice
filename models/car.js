const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userdb');

const carSchema = mongoose.Schema({
  name: String,
  email: String,
  imageurl: String
});

module.exports = mongoose.model('Car', carSchema);