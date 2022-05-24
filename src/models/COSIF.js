const COSIF = (sequelize, DataTypes) => {
  let cosif = sequelize.define(
    "COSIF",
    {
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
      foreignKey: "cosif_id",
      as: "cosif_prefecture"
    });
  }

  return cosif;
};

module.exports = COSIF;
