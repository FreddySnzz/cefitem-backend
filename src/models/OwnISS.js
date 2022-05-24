const OwnISS = (sequelize, DataTypes) => {
  let own_iss = sequelize.define(
    "OwnISS",
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      tableName: "own_iss",
      timestamps: true,
    }
  );

  own_iss.associate = (models) => {
    own_iss.hasMany(models.Prefecture, {
      foreignKey: "own_iss_id",
      as: "own_iss_prefecture"
    });
  }

  return own_iss;
};

module.exports = OwnISS;
