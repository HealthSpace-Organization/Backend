module.exports = function(app){

    const AuthController = require("../controllers/AuthController");

    app.post("/register_patient", AuthController.registerPatient);
    app.post("/login_patient",AuthController.loginPatient);

    app.post("/register_donor",AuthController.registerDonor);
    app.post("/login_donor",AuthController.loginDonor);

    app.post("/register_organization",AuthController.registerOrganization);
    app.post("/login_organization",AuthController.loginOrganization);

    app.post("/register_hospital",AuthController.registerHospital);
    app.post("/login_hospital",AuthController.loginHospital);

}
