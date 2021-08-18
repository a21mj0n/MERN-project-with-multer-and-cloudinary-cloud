const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  filial_id: {
    type: Number,
  },
  card_number: {
    type: Number,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  cloudinary_id: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
