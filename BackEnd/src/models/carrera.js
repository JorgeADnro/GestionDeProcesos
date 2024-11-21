const mongoose = require("mongoose");

const carreraSchema = mongoose.Schema({ 
    nom:{
        type: String
    }
})

module.exports = mongoose.model('Carrera', carreraSchema);