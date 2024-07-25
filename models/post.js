const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/database")

const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
)

module.exports = Post
