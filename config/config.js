require('dotenv').config()

const dbDetails = {
  username: 'root',
  password: 'root',
  database: 'demo',
  host: 3306,
  dialect: 'mysql',
  logging: false
}


module.exports = {
  development: dbDetails,
  production: dbDetails,
  test: dbDetails
}
