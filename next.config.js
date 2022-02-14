const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: process.env.DEV_MONGODB_USERNAME,
        mongodb_password: process.env.DEV_MONGODB_PASSWORD,
        mongodb_clustername: process.env.DEV_MONGODB_CLUSTERNAME,
        mongodb_database: process.env.DEV_MONGODB_DATABASE,
      },
    }
  }

  return {
    env: {
      mongodb_username: process.env.PROD_MONGODB_USERNAME,
      mongodb_password: process.env.PROD_MONGODB_PASSWORD,
      mongodb_clustername: process.env.PROD_MONGODB_CLUSTERNAME,
      mongodb_database: process.env.PROD_MONGODB_DATABASE,
    },
  }
}
