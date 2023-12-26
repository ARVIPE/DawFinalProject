const mongoose = require('mongoose');
const { contactSchema } = require('./schema')

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = {
    contactModel
};