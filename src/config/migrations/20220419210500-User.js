'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
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
      contributor_position: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      contributor_registry: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      company_name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      company_cnpj: {
        type: Sequelize.DataTypes.STRING(14),
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      economic_activity: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      cep: {
        type: Sequelize.DataTypes.STRING(8),
        allowNull: false,
      },
      uf: {
        type: Sequelize.DataTypes.STRING(2),
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      district: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      address_number: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      complement: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      phrase: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: Sequelize.DataTypes.STRING(6),
        allowNull: true,
      },
      secure_token: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: true,
      },
      enabled: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      terms_confirmed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_super_user: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};