const COSIF = (sequelize, DataTypes) => {
  let cosif = sequelize.define(
    "COSIF",
    {
      prefecture: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "cosif",
      timestamps: true,
    }
  );

  // cosif.associate = (models) => {
  //   cosif.belongsTo(models.Prefecture, {
  //     foreignKey: "prefecture_id",
  //     as: "cosif_upload"
  //   });
  // }

  return cosif;
};

module.exports = COSIF;
