const mongoose = require("mongoose");

module.exports = (config) => {
  mongoose.Promise = global.Promise;
  return mongoose.connect(config);
};
