const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Grace',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const fakePosts = [
  'Is it just me or is it hot today?',
  'Thanks for all my birthday messages, feeling very loved!',
  'My boyfriend has just left me',
  'Having some quality time with the dog and a tub of lard #BestLife',
  'Boris out!',
  'Anyone recommend a plumber with a decent size tool?',
  'Somonebody has just kicked my back doors in!',
  'Hello world',
  'Mental health is ok you know',
  'WTF Love Island!',
  'Anyone seen my cat?',
  'Youths hanging around outside the local shop, somebody should do something!',
  'Anyone got a 2020 Porsche Kayen for sale? £500 Cash waiting, PM me',
  'my account has been hacked, everyone please ignore me',
  'Farcebook are doing it again! Deleting my account!!!!',
  'Anyone know of a good place to get a bike?',
  'Got a new bike, anyone got a spare key?',
  'Just got home from a long day of work, anyone got a spare key?',
];


const possibleReactions = [
  'PM me hun 💘',
  'love it 😀',
  'awesome man! 😺 ',
  'You`re having a laugh',
  'Boris for President',
  'that is so offensive!',
  'no way dude!',
  'best dinner ever!',
  'Love my GF so much 💝 ',
  '#PrudDad',
  'What an utter twonk!',
  'Yay :D',
  'OMG!!!! 🤯 ',
  'banging tune!',
  'nah :-( ',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () => {

  const username = getRandomArrItem(names).toLowerCase() + Math.floor(Math.random() * names.length);
  const email = username + '@farcebook.com';
  return {
    username,
    email,
  };
}

const getRandomUsers = (int) => {

  const posts = [];
  const friends = [];

  for (let i = 0; i < int; i++) {
    const { username, email } = getRandomUser();
    users.push({
      username,
      email,
      posts,
      friends,
    });
  }
  return users;
}

// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomPosts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      commentText: getRandomArrItem(fakePosts),
      reactions: [...getPostReactions(Math.floor(Math.random() * 20))],
      username: users[Math.floor(Math.random() * users.length)].username,
    });
  }
  return results;
};

// Create the tags that will be added to each application
const getPostReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: users[Math.floor(Math.random() * users.length)].username,
      createdAt: Date.now(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsers, getRandomPosts };
