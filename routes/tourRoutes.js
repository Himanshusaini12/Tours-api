const express = require("express");
const tourController = require("./../controllers/tourControllers");
const router = express.Router();
const authController=require('./../controllers/authController');
// router.params("id", (req, res, next, val) => {
//   console.log(`tour id is ${val}`);
//   next();
// });
router.route('/getTourStats').get(tourController.getTourStats)
router
  .route("/")
  .get(authController.protect, tourController.getAlltours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .delete(tourController.deleteTour);

module.exports = router;
