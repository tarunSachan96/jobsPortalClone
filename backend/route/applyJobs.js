const express = require("express");
const router = express.Router();
const {
  getAllAppliedJobs,
  getTargetedJob,
  applyTargetedJob,
  deleteAppliedJob,
} = require("../controller/jobApplyController");

router.route("/applies/user/:id").get(getAllAppliedJobs);
router
  .route("/applies/:jobid")
  .get(getTargetedJob)
  .post(applyTargetedJob)
  .delete(deleteAppliedJob);

module.exports = router;
