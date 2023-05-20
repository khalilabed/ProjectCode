var mongoose = require('mongoose');
// const { Double } = require('mongodb');

var schema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      comments : {
          type: String,
          required: false,
      }
    });

var expense = new mongoose.model('Expenses', schema);

module.exports = expense;