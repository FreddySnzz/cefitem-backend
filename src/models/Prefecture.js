const Prefecture = (sequelize, DataTypes) => {
  let prefecture = sequelize.define(
    "Prefecture",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cep: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      adress: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "prefecture",
      timestamps: true,
    }
  );
  
  return prefecture;
};

module.exports = Prefecture;