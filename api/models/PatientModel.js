var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");

const SALT = 10;

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    nic:{
        type:String,
        required:[true,'NIC field is required!'],
        maxlength:20
    },
    address:{
        type:String,
        required:[true,'Address field is required!'],
        maxlength:100
    },
    gender:{
        type:String,
        required:[true,'Gender field is required!'],
        maxlength:20
    },
    dob:{
        type:Date,
        required:[true,'DOB field is required!']
    },
    age:{
        type:String,
        required:[true,'Age field is required!'],
        maxlength:20
    },
    weight:{
        type:String,
        required:[true,'Weight field is required!'],
        maxlength:20
    },
    blood_group:{
        type:String,
        required:[true,'Blood group field is required!'],
        maxlength:20
    },
    deceases:{
        type:String,
        required:[true,'Deceases field is required!'],
        maxlength:100
    },
    expected_organ_or_equipment:{
        type:String,
        required:[true,'Expected organ or equipment field is required!'],
        maxlength:100
    },
    hospital:{
        type:String,
        required:[true,'Hospital field is required!'],
        maxlength:100
    },
    email:{
        type:String,
        required:[true,'Email field is required!'],
        unique:true
    },
    phone_number:{
        type:String,
        required:[true,'Phone number field is required!']
    },
    password:{
        type:String,
        required:[true,'Password field is required!'],
        minlength:5
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

//Saving user data
PatientSchema.pre('save',function(next){
    var patient=this;
    if(patient.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(patient.password,salt,function(err,hash){
                if(err) return next(err)
                patient.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
PatientSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
PatientSchema.methods.generateToken=function(callBack){
    var patient=this;
    var token=jwt.sign(patient._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
PatientSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        Patient.findById(decode,function(err,patient){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,patient);
        });
    });
};   

const Patient = mongoose.model('Patient',PatientSchema);
module.exports = {Patient};