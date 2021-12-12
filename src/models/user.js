'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    //define all columns except the automatically included ones (id, createdAt, updatedAt), and the foreign keys/associations.  We HAVE included id here because we've strayed from the default by making id DataType UUID
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.INTEGER
    },
    rollNumber: {
      type: DataTypes.INTEGER
    }
  }, {

    classMethods: {
      associate: function(models) {
        console.log('===========user',models);
        Users.hasMany(models.addStudentDetails, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });

  Users.associate = function (models) {
    models.Users.hasMany(models.addStudentDetails, {   
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
      //                         
    });
  };
  
  return Users;
};
