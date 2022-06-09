const Contributor = (sequelize, DataTypes) => {
  let contributor = sequelize.define(
    "Contributor",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contributor_position: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      contributor_registry: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      municipal_registration: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      third_party: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      company_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      company_cnpj: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(14),
        allowNull: true,
      },
      economic_activity: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING(9),
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phrase: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "contributor",
      timestamps: true,
    }
  );

  contributor.associate = (models) => {
    contributor.hasMany(models.Documents, {
      foreignKey: "contributor_id",
      as: "contributor_id_documents"
    });
    contributor.hasMany(models.ParameterizationTIAF, {
      foreignKey: "contributor_id",
      as: "parameterization_tiaf_contributor"
    });
  };

  return contributor;

};

module.exports = Contributor;
