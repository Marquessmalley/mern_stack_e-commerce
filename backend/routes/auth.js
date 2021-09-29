const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controller/authController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/me", isAuthenticated, getUserProfile);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/me/update", isAuthenticated, updateProfile);

router.get("/admin/users", isAuthenticated, authorizeRoles("admin"), allUsers);
router.get(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getSingleUser
);
router.put(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUser
);
router.delete(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;
