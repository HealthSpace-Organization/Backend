const { verifyToken4 } = require("../utils/verifyToken");
module.exports = function(app) {

    const HospitalController = require("../controllers/HospitalController");
    
    app.post("/create_organ_request",[verifyToken4],HospitalController.createOrganRequest);
};