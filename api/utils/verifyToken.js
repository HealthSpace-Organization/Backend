const jwt = require('jsonwebtoken');
const createError = require( "../utils/error.js");

exports.verifyToken1 = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, patient) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.patient = patient;
        next();
    });
}

exports.verifyToken2 = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, donor) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.donor = donor;
        next();
    });
}

exports.verifyToken3 = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, organization) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.organization = organization;
        next();
    });
}


exports.verifyToken4 = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, hospital) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.hospital = hospital;
        next();
    });
}




