'use strict';

module.exports = {
  //function to run when (trying) to create the table (or make needed changes to it)
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('addStudentDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      UserId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: Sequelize.STRING,
      class: {
        type: Sequelize.INTEGER
      },
      percentage: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      
    });
  },
  //function to run when reverting the changes to the table
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('addStudentDetails');
  }
};
