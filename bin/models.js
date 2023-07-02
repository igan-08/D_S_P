const mongoose = require('mongoose');

const Questions_table = new mongoose.Schema({
    S_NO : {
        type :String,
    },
    Question_Name : { 
        type: String 
    },
    Topic_difficulty :{
        type: String
    },
    URL :{ 
        type : String,
    },
    Type : {
        type : String,
    },
    Youtube_link :{
        type : String,
    } 
});

const All_user = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    User_Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true

    },
    Password : {
        type : String,
        required : true
    },
    Mobile_Number : {
        type : Number,
        required : true
    },
    College : {
        type : String,
        required : true
    },
    Department : {
        type : String,
        required : true
    },
    RollNumber : {
        type : String,
        required : true
    },
    User_Type : {
        type : Number,
        required : true
    }
})

const Questions_Table = mongoose.model("Questions_table",Questions_table);

const All_User = mongoose.model("All_user",All_user);

module.exports = {Questions_Table,All_User};