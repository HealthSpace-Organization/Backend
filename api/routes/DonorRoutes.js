const { verifyToken2 } = require("../utils/verifyToken");
module.exports = function(app) {

    const DonorController = require("../controllers/DonorController");
    
    app.post("/create_organ_request",[verifyToken2],DonorController.createOrganRequest);
    
};