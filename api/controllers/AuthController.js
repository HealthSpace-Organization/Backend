const { Hospital } = require("../models/HospitalModel");
const { Organization } = require("../models/OrganizationModel");
const { Patient } = require("../models/PatientModel");
const { Donor }=require("../models/DonorModel");

exports.registerPatient = (req,res)=>{
    const patient = new Patient(req.body);

    patient.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginPatient=(req,res)=>{
    Patient.findOne({email:req.body.email},(err,patient)=>{
        if(!patient){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        patient.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            patient.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}
//donor
exports.registerDonor = (req,res)=>{
    const donor = new Donor(req.body);

    donor.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginDonor=(req,res)=>{
    Donor.findOne({email:req.body.email},(err,donor)=>{
        if(!donor){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        donor.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            donor.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}

//organization
exports.registerOrganization = (req,res)=>{
    const organization = new Organization(req.body);

    organization.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginOrganization=(req,res)=>{
    Organization.findOne({email:req.body.email},(err,organization)=>{
        if(!organization){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        organization.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            organization.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}

//hospital
exports.registerHospital = (req,res)=>{
    const hospital = new Hospital(req.body);

    hospital.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginHospital=(req,res)=>{
    Hospital.findOne({email:req.body.email},(err,hospital)=>{
        if(!hospital){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        hospital.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            hospital.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}


