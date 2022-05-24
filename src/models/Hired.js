const Hired = (sequelize, DataTypes) => {
  let hired = sequelize.define(
    "Hired",
    {
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

  hired.associate = (models) => {
    hired.hasMany(models.Prefecture, {
      foreignKey: "hired_id",
      as: "hired_prefecture"
    });
  }

  return hired;
};

module.exports = Hired;
