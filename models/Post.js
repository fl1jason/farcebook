const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const postSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxlength: 140,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
postSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Application model
const Post = model('post', postSchema);

module.exports = Post;
