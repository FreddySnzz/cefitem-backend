const EconomicActivity = (sequelize, DataTypes) => {
  let economicActivity = sequelize.define(
    "EconomicActivity",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contributor_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "economic_activity",
      timestamps: true,
    }
  );
  
  economicActivity = (models) => {
    economicActivity.belongsTo(models.Contributor, {
      foreignKey: "contributor_id",
      as: "contributor_activity"
    });
  }

  return economicActivity;
};

module.exports = EconomicActivity;