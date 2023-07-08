const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Поле должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Поле должно быть длиной от 2 до 30 символов'],
    },

    about: {
      type: String,
      required: true,
      minlength: [2, 'Поле должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Поле должно быть длиной от 2 до 30 символов'],
    },

    avatar: {
      type: String,
      required: true,
      match: /(https?:\/\/.*\.(?:png|jpg|bmp|webp))/i,
    },
  },

);

module.exports = mongoose.model('user', userSchema);
