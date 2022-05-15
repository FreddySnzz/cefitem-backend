const ERB = (sequelize, DataTypes) => {
  let erb = sequelize.define(
    "ERB",
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
      tableName: "erb",
      timestamps: true,
    }
  );

  // erb.associate = (models) => {
  //   erb.belongsTo(models.Prefecture, {
  //     foreignKey: "prefecture_id",
  //     as: "erb_upload"
  //   });
  // }

  return erb;
};

module.exports = ERB;
