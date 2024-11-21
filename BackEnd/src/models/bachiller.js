const mongoose = require("mongoose");

const bachillerSchema = mongoose.Schema({ 
    nom:{
        type: String
    }
})

module.exports = mongoose.model('Bachiller', bachillerSchema);