const { Model, DataTypes } = require("sequelize");
const db = require("../configDb");
const User = require("./Users");

class Favoritos extends Model {}

Favoritos.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    movieId: {
      type: DataTypes.INTEGER,
    },

    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "favoritos",
  }
);

Favoritos.belongsTo(User, { as: "user" });

module.exports = Favoritos;
