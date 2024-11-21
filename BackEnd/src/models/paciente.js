const mongoose = require("mongoose");

const pacienteSchema = mongoose.Schema({
    mat: {
        type: String,
        required: false
    },
    nom: {
        type: String,
        required: false
    },
    apeP: {
        type: String,
        required: false
    },
    apeM: {
        type: String,
        required: false
    },
    calle: {
        type: String,
        required: false
    },
    no: {
        type: String,
        required: false
    },
    col: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: false
    },
    cp: {
        type: Number,
        required: false
    },
    numTelCa: {
        type: String,
        required: false
    },
    numTelAsp: {
        type: String,
        required: false
    },
    numTelMaPa: {
        type: String,
        required: false
    },
    mail: {
        type: String,
        required: false
    },
    coment: {
        type: String,
        required: false
    },
    fechReg: {
        type: Date,
        require: false
    },
    foto: {
        data: Buffer,
        contentType: String
    },
    cert: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Paciente', pacienteSchema);