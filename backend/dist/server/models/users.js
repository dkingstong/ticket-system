"use strict";

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });
  Users.associate = function (models) {
    Users.hasMany(models.Tickets, {
      foreignKey: 'id'
    });
  };
  return Users;
};