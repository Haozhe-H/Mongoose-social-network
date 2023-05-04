const router = require("express").Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controller/thoughtController");

// /api

// /thoughts GET and POST
router.route("/").get(getThought).post(createThought);

// /thoughts/:id GET one, PUT and DELETE by ID
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /thoughts/:id/reactions POST reaction
router.route("/:thoughtId/reactions").post(createReaction);

// /thougths/:id/reactions/:id DELETE reaction by ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
