const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
console.log(process.env.DATABASE_URL)
const db = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres:/application:admin@localhost:5432/${databaseName}`,
  {
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
)

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
