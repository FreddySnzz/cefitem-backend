const Commercial = (sequelize, DataTypes) => {
  let commercial = sequelize.define(
    "Commercial",
    {
      prefecture_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      tableName: "commercial",
      timestamps: true,
    }
  );

  commercial.associate = (models) => {
    commercial.belongsTo(models.Prefecture, {
      foreignKey: "prefecture_id",
      as: "commercial_prefecture"
    });
  }

  return commercial;
};

module.exports = Commercial;
