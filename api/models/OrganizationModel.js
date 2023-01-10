var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");

const SALT = 10;

var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
    org_name:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    address:{
        type:String,
        required:[true,'Address field is required!'],
        maxlength:100
    },
    org_registraion_id:{
        type:String,
        required:[true,'Organization registration id field is required!'],
        maxlength:100
    },   
    org_type:{
        type:String,
        enum:['commercial','non-commertional'],
        required:[true,'Organization type field is required!']
    },
    org_service:{
        type:String,
        required:[true,'Organization service field is required!'],
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
OrganizationSchema.pre('save',function(next){
    var organization=this;
    if(organization.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(organization.password,salt,function(err,hash){
                if(err) return next(err)
                organization.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
OrganizationSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
OrganizationSchema.methods.generateToken=function(callBack){
    var organization=this;
    var token=jwt.sign(organization._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
OrganizationSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        Organization.findById(decode,function(err,organization){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,organization);
        });
    });
};   

const Organization = mongoose.model('Organization',OrganizationSchema);
module.exports = {Organization};