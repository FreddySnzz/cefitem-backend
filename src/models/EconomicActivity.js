const EconomicActivity = (sequelize, DataTypes) => {
  let economic_activity = sequelize.define(
    "EconomicActivity",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "economic_activity",
      timestamps: true,
    }
  );

  // erb.associate = (models) => {
  //   erb.hasMany(models.Prefecture, {
  //     foreignKey: "erb_id",
  //     as: "erb_prefecture"
  //   });
  // }

  return economic_activity;
};

module.exports = EconomicActivity;
