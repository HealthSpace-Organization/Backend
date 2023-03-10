var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");

const SALT = 10;

var Schema = mongoose.Schema;

var HospitalSchema = new Schema({
    hospital_name:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    address:{
        type:String,
        required:[true,'Address field is required!'],
        maxlength:100
    },
    hospital_registration_id:{
        type:String,
        required:[true,'Hospital registration id field is required!'],
        maxlength:20
    },
    phone_number:{
        type:String,
        required:[true,'Phone number field is required!']
    },
    email:{
        type:String,
        required:[true,'Email field is required!'],
        unique:true
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
HospitalSchema.pre('save',function(next){
    var hospital=this;
    if(hospital.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(hospital.password,salt,function(err,hash){
                if(err) return next(err)
                hospital.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
HospitalSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
HospitalSchema.methods.generateToken=function(callBack){
    var hospital=this;
    var token=jwt.sign(hospital._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
HospitalSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        Hospital.findById(decode,function(err,hospital){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,hospital);
        });
    });
};   

const Hospital = mongoose.model('Hospital',HospitalSchema);
module.exports = {Hospital};