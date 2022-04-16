// a file to send models in central waypoint //
// User //
const User = require('./User');

// Post //
const Post = require('./Post');

// Comment //
const Comment = require('./Comment.js');

// User-Post //
User.hasMany, {
    foreignKey: 'user_id'
});

// User-Comment //
User.hasMany (Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
});

// Comment-User //
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment-Post //
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true,
    created_at: true,
})

// Post-Comment //
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true,
    created_at: true,
})

// Export //
module.exports = { User, Post, Comment };