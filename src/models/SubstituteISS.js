const SubstituteISS = (sequelize, DataTypes) => {
  let substitute_iss = sequelize.define(
    "SubstituteISS",
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: "substitute_iss",
      timestamps: true,
    }
  );

  substitute_iss.associate = (models) => {
    substitute_iss.belongsTo(models.Prefecture, {
      foreignKey: "substitute_iss_id",
      as: "substitute_iss_prefecture"
    });
  }

  return substitute_iss;
};

module.exports = SubstituteISS;
