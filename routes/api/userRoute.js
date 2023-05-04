const router = require("express").Router();

const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controller/userController");

// /api

// /users GET and POST
router.route("/").get(getUser).post(createUser);

// /users/:id GET one, PUT and DELETE by ID
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /users/:userId/friends/:friendId POST and DELETE a friend by ID
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
