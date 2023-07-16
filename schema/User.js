// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Import the Sequelize instance

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lastlogin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priv: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
