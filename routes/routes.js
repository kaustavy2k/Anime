const express = require("express");
const authController = require("../controllers/authController");
const ratingsController = require("../controllers/ratingsController");

const router = express.Router();
router.route("/login").post(authController.login);
router.route("/signup").post(authController.signup);
router
  .route("/get-rating/:id")
  .get(authController.protect, ratingsController.getRating);
router
  .route("/give-rating/:id")
  .post(authController.protect, ratingsController.updateRating);
router
  .route("/all-ratings/:id")
  .get(authController.protect, ratingsController.getAllRatings);
  router
  .route("/map-ratings/:ids")
  .post(ratingsController.mapAllRatings);
module.exports = router;
