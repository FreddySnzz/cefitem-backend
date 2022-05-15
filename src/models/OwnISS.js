const OwnISS = (sequelize, DataTypes) => {
  let own_iss = sequelize.define(
    "OwnISS",
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
      tableName: "own_iss",
      timestamps: true,
    }
  );

  // own_iss.associate = (models) => {
  //   own_iss.belongsTo(models.Prefecture, {
  //     foreignKey: "prefecture_id",
  //     as: "own_iss_upload"
  //   });
  // }

  return own_iss;
};

module.exports = OwnISS;
