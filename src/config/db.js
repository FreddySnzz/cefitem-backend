const path = require("path");

require("dotenv").config({
  path:
    path.resolve(__dirname, "../../.env"),
});

module.exports = {
  //url: process.env.DEV_DATABASE_URL,
  username: 'wlissesmenezes_staging',
  password: 'kGGnN95q99Sh',
  database: 'wlissesmenezes_cefitem_staging',
  // host: 'mysql_db', // Docker Comunication local
  host: '207.244.244.74', // local
  dialect: process.env.DB_DIALECT || "mysql",
  explicit_defaults_for_timestamp: false,
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
  port: process.env.PORTDB || 3306
};
