const express = require("express");
const router = express();
const {
  Create,
  Update,
  Index,
  Find,
  Destroy,
  changeStatus,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/events", authenticateUser, authorizeRoles("organizer"), Create);
router.put(
  "/events/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Update
);
router.get("/events", authenticateUser, authorizeRoles("organizer"), Index);
router.get("/events/:id", authenticateUser, authorizeRoles("organizer"), Find);
router.delete(
  "/events/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Destroy
);
router.put(
  "/events/:id/status",
  authenticateUser,
  authorizeRoles("organizer"),
  changeStatus
);

module.exports = router;
