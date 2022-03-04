const { Model, DataTypes } = require("sequelize");
const db = require("../configDb");
const bcrypt = require("bcrypt");

class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {

    name:{
      type: DataTypes.STRING,
    },
    lastname:{
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },

    completeName: {
      type: DataTypes.VIRTUAL,
      get() {
         return (` ${this.getDataValue("name")}` +  " "  + `${this.getDataValue("lastname")}`)    
      }
  }
  },
  {
    sequelize: db,
    tableName: "users",
  }
);



User.beforeCreate((user) => {
  return bcrypt
    .genSalt(4)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
