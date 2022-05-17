'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('own_iss', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      prefecture_id: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true
      },
      status: {
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
    await queryInterface.dropTable('own_iss');
  }
};
