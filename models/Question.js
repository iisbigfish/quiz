var mongoose = require('mongoose');
var questionSchema = require('../schemas/question.js');

module.exports = mongoose.model('Question',questionSchema);