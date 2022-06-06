'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('economic_activity', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('economic_activity');
  }
};
