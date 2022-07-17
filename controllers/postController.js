const { Post, User } = require('../models');

module.exports = {
  // Function to get all of the applications by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  getPosts(req, res) {
    Post.find()
      .then((posts) => res.json(posts))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
  getSinglePost(req, res) {
    Post.findOne({ _id: req.params.postId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'No Post with that ID' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creates a new application. Accepts a request body with the entire Application object.
  // Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
  createPost(req, res) {
    Post.create(req.body)
      .then((post) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { posts: post._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Post created, but found no user with that ID',
          })
          : res.json('Post Created Successfully')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'No Post with this id!' })
          : res.json(post)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Deletes an application from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
  deletePost(req, res) {
    Post.findOneAndRemove({ _id: req.params.postId })
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'No Apllication with this id!' })
          : User.findOneAndUpdate(
            { posts: req.params.postId },
            { $pull: { applications: req.params.post } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'Post deleted but no user with this id!',
          })
          : res.json({ message: 'Post successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Adds a tag to an application. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
  addReaction(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'No Post with this id!' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove application tag. This method finds the application based on ID. It then updates the tags array associated with the app in question by removing it's tagId from the tags array.
  removeReaction(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.postId },
      { $pull: { reactions: { Id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((post) =>
        !post
          ? res.status(404).json({ message: 'No Post with this id!' })
          : res.json(post)
      )
      .catch((err) => res.status(500).json(err));
  },
};
