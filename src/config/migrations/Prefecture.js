'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prefecture', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      name: {
        type: Sequelize.DataTypes.STRING(50),
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
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      district: {
        type: Sequelize.DataTypes.STRING(50),
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
      mayor_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      treasury_secretariat_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      secretary_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      secretary_position: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      collection_sector: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      responsible_for_the_collection_sector: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      position_of_the_responsible_for_the_collection_sector: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      taxman_position: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      taxman_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      taxman_registration: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      technical_contact_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      technical_telephone: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      technical_cellphone: {
        type: Sequelize.DataTypes.STRING(11),
        allowNull: false,
      },
      contact_email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      prefecture_telephone: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      prefecture_email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      commecial_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      cosif_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      cosip_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      erb_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      hired_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      own_iss_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      substitute_iss_id : {
        type: Sequelize.DataTypes.STRING(10),
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
    await queryInterface.dropTable('Prefecture');
  }
};
