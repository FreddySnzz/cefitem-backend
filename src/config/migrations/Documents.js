'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      label: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      link: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      signed_document: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
      },
      prefecture_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER(10),
        allowNull: false,
      },
      parameterization_tiaf_id: {
        type: Sequelize.DataTypes.INTEGER(10),
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
    await queryInterface.dropTable('documents');
  }
};
