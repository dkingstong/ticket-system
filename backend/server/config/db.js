module.exports = {
  development: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'app_db_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_HOST|| 'containers-us-west-191.railway.app',
    password: process.env.DB_PASSWORD || 'FZs24ugLY7ZLjETLrVoa',
    database: process.env.DB_NAME || 'railway',
    host: process.env.DB_HOST || 'postgresql://postgres:FZs24ugLY7ZLjETLrVoa@containers-us-west-191.railway.app:6625/railway',
    dialect: 'postgres'
  }
}