const Prefecture = (sequelize, DataTypes) => {
  let prefecture = sequelize.define(
    "Prefecture",
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mayor_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      treasury_secretariat_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      secretary_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      secretary_position: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      collection_sector: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      responsible_for_the_collection_sector: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      position_of_the_responsible_for_the_collection_sector: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      taxman_position: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      taxman_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      taxman_registration: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      technical_contact_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      technical_telephone: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      technical_cellphone: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      contact_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      prefecture_telephone: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      prefecture_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "prefecture",
      timestamps: true,
    }
  );

  prefecture.associate = (models) => {
    prefecture.hasMany(models.Files, {
      foreignKey: "prefecture_id",
      as: "files_upload"
    });

    prefecture.hasMany(models.Commercial, {
      foreignKey: "prefecture_id",
      as: "commercial_prefecture"
    });

    prefecture.hasMany(models.COSIF, {
      foreignKey: "prefecture_id",
      as: "cosif_prefecture"
    });

    prefecture.hasMany(models.COSIP, {
      foreignKey: "prefecture_id",
      as: "cosip_prefecture"
    });

    prefecture.hasMany(models.ERB, {
      foreignKey: "prefecture_id",
      as: "erb_prefecture"
    });

    prefecture.hasMany(models.Hired, {
      foreignKey: "prefecture_id",
      as: "hired_prefecture"
    });

    prefecture.hasMany(models.OwnISS, {
      foreignKey: "prefecture_id",
      as: "own_iss_prefecture"
    });

    prefecture.hasMany(models.SubstituteISS, {
      foreignKey: "prefecture_id",
      as: "substitute_iss_prefecture"
    });

    prefecture.hasMany(models.SubstituteISS, {
      foreignKey: "prefecture_id",
      as: "parameterization_tiaf_prefecture"
    });
  }


  return prefecture;
};

module.exports = Prefecture;
