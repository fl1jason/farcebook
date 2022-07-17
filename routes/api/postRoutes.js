const router = require('express').Router();
const {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  addReaction,
  removeReaction,
} = require('../../controllers/postController');

// /api/Posts
router.route('/')
  .get(getPosts)
  .post(createPost)

// /api/Posts/:PostId
router.route('/:postId')
  .get(getSinglePost)
  .put(updatePost)
  .delete(deletePost);

// /api/posts/:postid/tags
router.route('/:postId/reactions')
  .post(addReaction);

// /api/Posts/:postid/reactions/:reactionid
router.route('/:postId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
