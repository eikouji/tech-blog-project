const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "When I use these <> it makes everything look like a taco.",
        post_id: 5,
        user_id: 1,
    },
    {
        comment_text: "I would want to Taco-bout back-ticks || `` || vs single quotes || '' ||, if you don't mind.",
        post_id: 4,
        user_id: 2,
    },
    {
        comment_text: "What's the issue with back-ticks and single quotes?",
        post_id: 3,
        user_id: 3,
    },
    {
        comment_text: "Sometimes I'll do one when I meant the other, and sometimes my eyes see one when they have to be the other one.",
        post_id: 5,
        user_id: 4,
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;