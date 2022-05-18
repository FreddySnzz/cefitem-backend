const COSIP = (sequelize, DataTypes) => {
  let cosip = sequelize.define(
    "COSIP",
    {
      prefecture_id: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: "cosip",
      timestamps: true,
    }
  );

  cosip.associate = (models) => {
    cosip.belongsTo(models.Prefecture, {
      foreignKey: "prefecture_id",
      as: "cosip_prefecture"
    });
  }

  return cosip;
};

module.exports = COSIP;
