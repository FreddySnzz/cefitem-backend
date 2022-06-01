const Commercial = (sequelize, DataTypes) => {
  let commercial = sequelize.define(
    "Commercial",
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: "commercial",
      timestamps: true,
    }
  );

  commercial.associate = (models) => {
    commercial.hasMany(models.Prefecture, {
      foreignKey: "commercial_id",
      as: "commercial_prefecture"
    });
  }

  return commercial;
};

module.exports = Commercial;
