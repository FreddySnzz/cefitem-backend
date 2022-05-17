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
      foreignKey: "economic_activity",
      as: "contributor_activity"
    });
  }

  return economicActivity;
};

module.exports = EconomicActivity;