'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parameterization_tiaf', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "id"
      },
      prefecture_id: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      contributor_id: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      law_type: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      law_number: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      publication_date: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      initial_article_tax: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      final_article_tax: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      monetary_correction: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      dl_monetary_correction: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      late_payment_interest: {
        type: Sequelize.DataTypes.INTEGER(255),
        allowNull: false,
      },
      dl_late_payment_interest: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      moratorium_fine: {
        type: Sequelize.DataTypes.INTEGER(255),
        allowNull: false,
      },
      dl_moratorium_fine: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      dl_limit_moratorium_fine: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      limit_moratorium_fine: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      aplication_moratorium_fine: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      interest_rate_of_late: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      moras_fine: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      indexer: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      indexer_name: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      indexer_value: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      effective_date: {
        type: Sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      issued: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      sent: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable('parameterization_tiaf');
  }
};
