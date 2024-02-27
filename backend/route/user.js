const express = require("express");
const router = express.Router();
const { Login, SignUp } = require("../controller/userController");
const {
  GetDetails,
  UpdateDetails,
  AddUserDetails,
  Applies,
} = require("../controller/jobSeekerDetailsController");

router.route("/signup").post(SignUp);
router.route("/login").post(Login);
router.route("/details/").post(AddUserDetails);
router
  .route("/details/:id")
  .get(GetDetails)
  .post(AddUserDetails)
  .patch(UpdateDetails);
// router.route("/applies/:id").get(Applies).post(Applies);

module.exports = router;
