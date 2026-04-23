const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createGrievance,
  getGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance,
} = require("../controllers/grievanceController");

router.use(auth);

router.post("/", createGrievance);
router.get("/", getGrievances);
router.get("/search", searchGrievance);
router.get("/:id", getGrievanceById);
router.put("/:id", updateGrievance);
router.delete("/:id", deleteGrievance);

module.exports = router;