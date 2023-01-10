const { OrganRequest }=require("../models/OrganRequestModel");

exports.createOrganRequest = async (req, res) => {
    var newOrganRequest = new OrganRequest(req.body);

    await newOrganRequest.save((err, post) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create request!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New request is created!",
                data: post
            });
        }
    });
};