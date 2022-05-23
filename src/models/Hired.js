const Hired = (sequelize, DataTypes) => {
  let hired = sequelize.define(
    "Hired",
    {
      prefecture_id: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
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
  //     as: "hired_prefecture"
  //   });
  // }

  return hired;
};

module.exports = Hired;
