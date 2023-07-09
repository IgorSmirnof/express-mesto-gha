const mongoose = require('mongoose');
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
