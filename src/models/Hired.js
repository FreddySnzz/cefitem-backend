const Hired = (sequelize, DataTypes) => {
  let hired = sequelize.define(
    "Hired",
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
      tableName: "hired",
      timestamps: true,
    }
  );

  // hired.associate = (models) => {
  //   hired.belongsTo(models.Prefecture, {
  //     foreignKey: "prefecture_id",
  //     as: "hired_upload"
  //   });
  // }

  return hired;
};

module.exports = Hired;
