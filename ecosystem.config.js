module.exports = {
  apps : [{
    name: "cefitem-backend",
    script: "node ./bin/www",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
