const Documents = (sequelize, DataTypes) => {
  let documents = sequelize.define(
    "Documents",
    {
      label: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      signed_document: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      prefecture_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      parameterization_tiaf_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      }
    },
    {
      tableName: "documents",
      timestamps: true,
    }
  );

  documents.associate = (models) => {

    documents.belongsTo(models.Prefecture, {
      foreignKey: "prefecture_id",
      as: "prefecture_id_documents"
    });

    documents.belongsTo(models.Admin, {
      foreignKey: "admin_id",
      as: "admin_id_documents"
    });

    documents.belongsTo(models.ParameterizationTIAF, {
      foreignKey: "parameterization_tiaf_id",
      as: "parameterization_tiaf_id_documents"
    });
  };

  return documents;

};

module.exports = Documents;
