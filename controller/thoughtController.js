const { User, Thought } = require("../model");

// get thought, all and by id
function getThought(req, res) {
  Thought.find({})
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
}

function getSingleThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No Thought find with this ID." })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// create thought
function createThought(req, res) {
  Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No User find with this ID." })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// update
function updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, New: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No thought find with this ID." })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
}

// delete
function deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought find with this ID." })
        : //update user after deleting a thought with user id
          User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: "Thought deleted, no corresponding user found." })
        : res.json({ message: "Thought has been deleted." })
    )
    .catch((err) => res.status(500).json(err));
}

// create reaction
function createReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought frind with ID." })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// delete reaction
function deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought find with this ID." })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
