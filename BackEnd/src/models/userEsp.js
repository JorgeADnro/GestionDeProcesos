const {model, Schema} = require ('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    tituloUniversitario: {
        data: Buffer,
        contentType: String
    },
    cert: {
        data: Buffer,
        contentType: String
    },
    numTelEsp: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'Especialista'
    }
});

module.exports = model ('userEsp', userSchema);
