var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.send('Welcome to API!');
});

require('./AuthRoutes')(router);
require('./PatientRoutes')(router);
// require('./DonorRoutes')(router);
// require('./OrganizationRoutes')(router);
// require('./HospitalRoutes')(router);

module.exports.router=router;