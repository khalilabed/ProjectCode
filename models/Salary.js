var mongoose = require('mongoose');
// const { Double } = require('mongodb');

var schema = new mongoose.Schema({
    monthly_salary: {
        type: String,
        required: true,
      }
    });

var salary = new mongoose.model('Salary', schema);

module.exports = salary;