'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      file: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      prefecture_files: {
        type: Sequelize.DataTypes.STRING(3),
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
    await queryInterface.dropTable('files');
  }
};
