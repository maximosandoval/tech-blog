const { User } = require("../models");

// Create User Data
const userData = [
  {
    userName: "codeblogger",
    email: "codeblogger@gmail.com",
    password: "password",
  },
  {
    userName: "amazingcoder",
    email: "amzingcoder@gmail.com",
    password: "p@ssword2",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
