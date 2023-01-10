const { verifyToken3 } = require("../utils/verifyToken");
module.exports = function(app) {

    const OrganizationController = require("../controllers/OrganizationController");
    
    app.post("/create_organ_request",[verifyToken3],OrganizationController.createOrganRequest);
};