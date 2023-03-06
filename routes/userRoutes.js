const express = require("express");

const router = express.Router();
const userController = require("./../controllers/userController");
const authController =require('./../controllers/authController')

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

// router
//   .route("/api/v1/users/:id")
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

module.exports = router;
