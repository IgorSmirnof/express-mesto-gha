const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Поле должно быть длиной от 2 до 30 символов'],
      maxlength: [30, 'Поле должно быть длиной от 2 до 30 символов'],
    },

    link: {
      type: String,
      required: true,
      validate: {
        validator: (data) => validator.isURL(data),
        message: 'Введите валидный e-mail',
      },
    },

    owner: {
      type: ObjectId,
      required: true,
      ref: 'user',
    },

    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
