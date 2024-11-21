const mongoose = require("mongoose");

const aspiranteSchema = mongoose.Schema({
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
    nomBach: {
        type: String,
        required: false
    },
    promBach: {
        type: Number,
        required: false
    },
    espCur: {
        type: String,
        required: false
    },
    nomMa: {
        type: String,
        required: false
    },
    apePMa: {
        type: String,
        required: false
    },
    apeMMa: {
        type: String,
        required: false
    },
    nomPa: {
        type: String,
        required: false
    },
    apePPa: {
        type: String,
        required: false
    },
    apeMPa: {
        type: String,
        required: false
    },
    fechReg: {
        type: Date,
        require: false
    },
    carrCur: {
        type: String,
        required: false
    },
    foto: {
        data: Buffer,
        contentType: String
    },
    cert: {
        data: Buffer,
        contentType: String
    },
    compDom: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Aspirante', aspiranteSchema);