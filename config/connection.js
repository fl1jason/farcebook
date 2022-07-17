const { connect, connection } = require('mongoose');

connect('mongodb://localhost/farcebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
