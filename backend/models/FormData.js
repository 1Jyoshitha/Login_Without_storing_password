// const mongoose = require('mongoose');

// const FormDataSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     publicKey: String, // Store the public key 'y'
//     g: String,         // Store 'g'
//     p: String          // Store 'p'
// });

// const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

// module.exports = FormDataModel;
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    g: String,
    p: String,
    y: String,
});

module.exports = mongoose.model('FormData', formDataSchema);
