const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            required:false
        },
        password:{
            type: String,
            require:true
        },
        requests: {
            type: Array,
            require: true
        },
        role : {
            type: String,
            require: true
        },
        isLogged: {
            type: Boolean,
            require: true
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

module.exports = mongoose.model('users',userSchema);