'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      phrase: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: Sequelize.DataTypes.STRING(6),
        allowNull: true,
      },
      enabled: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_super_admin : {
        type: Sequelize. DataTypes.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('admin');
  }
};
