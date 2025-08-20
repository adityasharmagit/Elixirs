const express = require("express");
const { createReview, deleteReview } = require("../controller/review.controller.js");
const { protectRoute, isReviewAuthor } = require("../middleware/user.middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

const router = express.Router();

router.post("/wall/:id/review", protectRoute, wrapAsync(createReview));
router.delete("/wall/:id/review/:reviewId", protectRoute, isReviewAuthor, wrapAsync(deleteReview));

module.exports = router;