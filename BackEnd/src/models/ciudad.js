const mongoose = require("mongoose");

const ciudadSchema = mongoose.Schema({ 
    nom:{
        type: String
    }
})

module.exports = mongoose.model('Ciudad', ciudadSchema);