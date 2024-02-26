const express = require("express");
const router = express.Router();

const {
  GetAllJobs,
  GetJob,
  AddJob,
  EditJob,
  DeleteJob,
} = require("../controller/jobsController");
router.route("/jobsposted/jobs").get(GetAllJobs).post(AddJob);
router
  .route("/jobsposted/jobs/:jobid")
  .patch(EditJob)
  .delete(DeleteJob)
  .get(GetJob);

module.exports = router;
