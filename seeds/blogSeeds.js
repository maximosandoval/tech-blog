const { Blog } = require('../models');

// Create blog
const blogData = [
    {
        title: "Why MVC is so important",
        content: "MVC allows developers to maintain a true separation on concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
        user_id: 1
    },
    {
        title: "Authentication vs. Authorization",
        content: "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being able to access the system.",
        user_id: 2
    }
]

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;