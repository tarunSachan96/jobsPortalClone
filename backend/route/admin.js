const express = require("express");
const router = express.Router();

const {GetEmployeerDetails,AddEmployeerDetails,EditEmployeerDetails} = require("../controller/employeerDetailsController")
router.route("/details/:id").get(GetEmployeerDetails).post(AddEmployeerDetails).patch(EditEmployeerDetails);
// router.route("/jobsposted/:id/:jobid").get(Applies).post(Applies);

module.exports = router;
