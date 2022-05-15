const EconomicActivity = (sequelize, DataTypes) => {
  let economicActivity = sequelize.define(
    "EconomicActivity",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    },
    {
      tableName: "economic_activity",
      timestamps: true,
    }
  );
  
  economicActivity = (models) => {
    economicActivity.hasMany(models.Contributor, {
      foreignKey: "name",
      as: "economicActivity"
    });
  }

  return economicActivity;
};

module.exports = EconomicActivity;