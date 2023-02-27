const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
    {
        deviceAddress:{
            type:String,
            require:true
        },
        requests:{
            type: Array,
            require:true,
        },
        createdAt:{
            type:Date,
            require:true
        },
        updatedAt:{
            type:Date,
            require:false
        }
    }
);

module.exports = mongoose.model('visitors',visitorSchema);