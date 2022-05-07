const User = (sequelize, DataTypes) => {
  let user = sequelize.define(
    "User",
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
      economic_activity: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING(8),
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
      terms_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_super_user: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: true,
    }
  );

  // user.associate = (models) => {
  //   user.belongsTo(models.EconomicActivity, {
  //     foreignKey: "activity_name",
  //     as: "economic_activity"
  //   });
  // }

  return user;
};

module.exports = User;
