const ERB = (sequelize, DataTypes) => {
  let erb = sequelize.define(
    "ERB",
    {
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
    erb.hasMany(models.Prefecture, {
      foreignKey: "erb_id",
      as: "erb_prefecture"
    });
  }

  return erb;
};

module.exports = ERB;
