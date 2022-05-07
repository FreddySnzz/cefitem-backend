const EconomicActivity = (sequelize, DataTypes) => {
  let economic_activity = sequelize.define(
    "EconomicActivity",
    {
      activity_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    },
    {
      tableName: "economic_activity",
      timestamps: true,
    }
  );
  
  // economic_activity = (models) => {
  //   economic_activity.hasMany(models.User, {
  //     foreignKey: "activity_name",
  //     as: "economic_activity"
  //   });
  // }

  return economic_activity;
};

module.exports = EconomicActivity;