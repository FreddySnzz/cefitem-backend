const ERB = (sequelize, DataTypes) => {
  let erb = sequelize.define(
    "ERB",
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
      tableName: "erb",
      timestamps: true,
    }
  );

  erb.associate = (models) => {
    erb.belongsTo(models.Prefecture, {
      foreignKey: "prefecture_id",
      as: "erb_prefecture"
    });
  }

  return erb;
};

module.exports = ERB;
