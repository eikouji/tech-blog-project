// use Model and Datatype from sequelize //
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// use bcrypt for password hashing //
const bcrypt = require('bcrypt');

// create the User model //
class User extends Model {
    // set up a method, check password //
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define the table columns and configuration //
User.init(
  {
    // TABLE COLUMN DEFINITIONS //
    // define an id column //
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
            }
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
            }
        }
  },
  {
    // TABLE CONFIGURATION OPTIONS (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // password hashing operation //
    hooks: {
        // return the new userdata object //
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
        //  hash the password before a user object is updated in the database //
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;