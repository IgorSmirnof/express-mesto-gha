const mongoose = require('mongoose');
const validatorJS = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Янотт3',
      validate: {
        validator: (str) => validatorJS.isLength(str, { min: 2, max: 30 }),
        message: 'Поле должно быть длиной от 2 до 30 символов',
      },
    },

    about: {
      type: String,
      default: 'Исследователь еды',
      validate: {
        validator: (str) => validatorJS.isLength(str, { min: 2, max: 30 }),
        message: 'Поле должно быть длиной от 2 до 30 символов',
      },
    },

    avatar: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyf_zOcxA8xzbXgSLrpyzuBNHQLLwxvJyyEA&usqp=CAU',
      validate: {
        validator: (url) => validatorJS.isURL(url),
        message: 'Введите корректный URL',
      },
    },
  },

);

module.exports = mongoose.model('user', userSchema);
