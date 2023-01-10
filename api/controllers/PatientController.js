const UseRole = require("../enums/UseRole");
const { Patient } = require("../models/PatientModel");
const { Post } = require("../models/CreatePostModel");
const { OrganRequest }=require("../models/OrganRequestModel");

exports.createPost = async (req, res) => {
    var newService = new Post(req.body);

    await newService.save((err, post) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create post!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New post is created!",
                data: post
            });
        }
    });
};

exports.getAllPosts = async (req, res) => {
    Post.find(function(err, posts) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive posts!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received posts!",
            data: posts
        });
    });
};


exports.getPostById = async (req, res) => {
    Service.findById(req.params.id, async function(err, post) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid post id!"
            });
        }

        if(!post) {
            return res.status(422).json({
                success: false,
                message: "Invalid post id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Post received!",
            data: post
        });
    });
};

exports.createOrganRequest = async (req, res) => {
    var newOrganRequest = new OrganRequest(req.body);

    await newOrganRequest.save((err, post) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create organ request!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New organ request is created!",
                data: post
            });
        }
    });
};
    



