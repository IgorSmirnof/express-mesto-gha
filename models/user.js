const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Поле должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Поле должно быть длиной от 2 до 30 символов'],
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      minlength: [2, 'Поле должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Поле должно быть длиной от 2 до 30 символов'],
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      validate: {
        validator: (data) => validator.isURL(data),
        message: 'Введите валидный URL',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (data) => validator.isEmail(data),
        message: 'Введите валидный e-mail',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
