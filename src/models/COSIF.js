const COSIF = (sequelize, DataTypes) => {
  let cosif = sequelize.define(
    "COSIF",
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
      tableName: "cosif",
      timestamps: true,
    }
  );

  cosif.associate = (models) => {
    cosif.belongsTo(models.Prefecture, {
      foreignKey: "prefecture_id",
      as: "cosif_prefecture"
    });
  }

  return cosif;
};

module.exports = COSIF;
