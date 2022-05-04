const Files = (sequelize, DataTypes) => {
  let files = sequelize.define(
    "Files",
    {
      file: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      user_files: {
        type: DataTypes.STRING(3),
        allowNull: false
      }
    },
    {
      tableName: "files",
      timestamps: true,
    }
  );

  files.associate = (models) => {
    files.belongsTo(models.Prefecture, {
      foreignKey: "user_files",
      as: "files_upload"
    });
  }

  return files;
};

module.exports = Files;
