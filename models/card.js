const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const validatorJS = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (str) => validatorJS.isLength(str, { min: 2, max: 30 }),
        message: 'Название карточки от 2 до 30 символов',
      },
    },

    link: {
      type: String,
      required: true,
      validate: {
        validator: (url) => validatorJS.isURL(url),
        message: 'Введите корректный URL',
      },
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
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
);

module.exports = mongoose.model('card', cardSchema);
