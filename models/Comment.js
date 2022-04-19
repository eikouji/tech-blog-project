const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKEy: true,

        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.String,
        // comment must be at least 3 characters long //
        validate: { 
            len: [3]
        }
    },
    user_id: {
        type: DataTypes.INTEGR, 
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
            autoIncrement: true;

        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false;
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
}

});

module.exports = Comment;