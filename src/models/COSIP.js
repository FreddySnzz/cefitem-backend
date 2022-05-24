const COSIP = (sequelize, DataTypes) => {
  let cosip = sequelize.define(
    "COSIP",
    {
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
      foreignKey: "cosip_id",
      as: "cosip_prefecture"
    });
  }

  return cosip;
};

module.exports = COSIP;
