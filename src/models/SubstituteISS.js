const SubstituteISS = (sequelize, DataTypes) => {
  let substitute_iss = sequelize.define(
    "SubstituteISS",
    {
      prefecture: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "substitute_iss",
      timestamps: true,
    }
  );

  // substitute_iss.associate = (models) => {
  //   substitute_iss.belongsTo(models.Prefecture, {
  //     foreignKey: "prefecture_id",
  //     as: "substitute_iss_upload"
  //   });
  // }

  return substitute_iss;
};

module.exports = SubstituteISS;
