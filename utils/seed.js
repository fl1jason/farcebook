const connection = require('../config/connection');
const { User, Post } = require('../models');
const { getRandomUsers, getRandomPosts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Post.deleteMany({});
  await User.deleteMany({});

  const users = getRandomUsers(Math.floor(Math.random() * 50));
  await User.collection.insertMany(users);

  const posts = getRandomPosts(Math.floor(Math.random() * 100));
  await Post.collection.insertMany(posts);

  // Loop through each post and add the user id to the user's posts array
  for (let i = 0; i < posts.length; i++) {
    const user = await User.findOne({ username: posts[i].username });
    await user.updateOne({ $addToSet: { posts: posts[i]._id } });
  }

  // Load all Users and add their ids in to an array
  const allUsers = await User.find({});
  const userIds = allUsers.map((user) => user._id);

  // Loop through each user and add the user id to the user's following array
  for (let i = 0; i < userIds.length; i++) {

    const user = await User.findById(userIds[i]);
    const friends = userIds.slice(0, Math.floor(Math.random() * userIds.length));
    await user.updateOne({ $addToSet: { friends: friends } });
  }

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(posts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});


