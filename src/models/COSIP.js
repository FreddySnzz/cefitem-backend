const COSIP = (sequelize, DataTypes) => {
  let cosip = sequelize.define(
    "COSIP",
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
      tableName: "cosip",
      timestamps: true,
    }
  );

  // cosip.associate = (models) => {
  //   cosip.belongsTo(models.Prefecture, {
  //     foreignKey: "prefecture_id",
  //     as: "cosip_upload"
  //   });
  // }

  return cosip;
};

module.exports = COSIP;
