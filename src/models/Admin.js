const Admin = (sequelize, DataTypes) => {
  let admin = sequelize.define(
    "Admin",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      phrase: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_super_admin : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      tableName: "admin",
      timestamps: true,
    }
  );

  return admin;
};

module.exports = Admin;
