const mongoose = require("mongoose");

const especialidadSchema = mongoose.Schema({ 
    nom:{
        type: String
    }
})

module.exports = mongoose.model('Especialidad', especialidadSchema);