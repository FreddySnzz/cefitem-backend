const ParameterizationTIAF = (sequelize, DataTypes) => {
  let parameterization_tiaf = sequelize.define(
    "ParameterizationTIAF",
    {
      prefecture_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      contributor_id: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      law_type: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      law_number: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      publication_date: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      initial_article_tax: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      final_article_tax: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      monetary_correction: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      dl_monetary_correction: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      late_payment_interest: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
      },
      dl_late_payment_interest: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      moratorium_fine: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
      },
      limit_moratorium_fine: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      aplication_moratorium_fine: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      indexer: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      indexer_name: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      indexer_value: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      effective_date: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      issued: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      sent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      tableName: "parameterization_tiaf",
      timestamps: true,
    }
  );

  parameterization_tiaf.associate = (models) => {
    parameterization_tiaf.belongsTo(models.Prefecture, {
      foreignKey: "prefecture_id",
      as: "parameterization_tiaf"
    });

    parameterization_tiaf.belongsTo(models.Contributor, {
      foreignKey: "contributor_id",
      as: "parameterization_tiaf_contributor"
    })
  }

  return parameterization_tiaf;
};

module.exports = ParameterizationTIAF;
