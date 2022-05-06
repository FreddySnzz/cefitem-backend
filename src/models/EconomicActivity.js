const EconomicActivity = (sequelize, DataTypes) => {
  let economic_activity = sequelize.define(
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
  
  economic_activity = (models) => {
    economic_activity.hasMany(models.User, {
      foreignKey: "user_economic_activity",
      as: "economic_activity"
    });
  }

  return economic_activity;
};

module.exports = EconomicActivity;