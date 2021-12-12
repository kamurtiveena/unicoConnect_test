'use strict';
module.exports = function(sequelize, DataTypes) {
  var addStudentDetails = sequelize.define('addStudentDetails', {
    //define all columns except the automatically included ones (id, createdAt, updatedAt), and the foreign keys/associations.  We HAVE included id here because we've strayed from the default by making id DataType UUID
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    class: {
      type: DataTypes.INTEGER
    },
    percentage: {
      type: DataTypes.INTEGER
    },
    remark: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        addStudentDetails.belongsTo(models.Users, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  //creating association Gender with Client
  addStudentDetails.associate = function (models) {
  models.addStudentDetails.belongsTo(models.Users, { 
    foreignKey: 'UserId'                   
  });
};
  
  return addStudentDetails;
};

// standard 1st: remark: pass, percentage: 85%