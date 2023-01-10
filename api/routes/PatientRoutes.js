const { verifyToken1 } = require("../utils/verifyToken");
module.exports = function(app) {

    const PatientController = require("../controllers/PatientController");
    
    app.post("/create_post",[verifyToken1],PatientController.createPost);
    app.get("/posts",[verifyToken1],PatientController.getAllPosts);
    app.get("/post/:id", [verifyToken1], PatientController.getPostById);

    app.post("/create_organ_request",[verifyToken1],PatientController.createOrganRequest);
};