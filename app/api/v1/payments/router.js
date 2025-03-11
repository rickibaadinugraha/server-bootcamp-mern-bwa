const express = require("express");
const router = express();
const { Create, Update, Index, Find, Destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/payments", authenticateUser, authorizeRoles("organizer"), Create);
router.put(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Update
);
router.get("/payments", authenticateUser, authorizeRoles("organizer"), Index);
router.get(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Find
);
router.delete(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Destroy
);
router.put(
  "/payments/:id/status",
  authenticateUser,
  authorizeRoles("organizer")
);

module.exports = router;
