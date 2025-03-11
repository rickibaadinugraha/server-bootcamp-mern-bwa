const express = require("express");
const router = express();
const { Create, Index, Find, Update, Destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/categories", authenticateUser, authorizeRoles("organizer"), Index);
router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Find
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  Create
);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  Destroy
);

module.exports = router;
