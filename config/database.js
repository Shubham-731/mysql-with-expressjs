// config/database.js
const { Sequelize } = require("sequelize")

const DB_NAME = "express_db"
const DB_USER = "root"
const DB_PASSWORD = "shubbhu"
const DB_HOST = "localhost"

// Create a Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
})

// Function to create database if it doesn't exist
const createDatabase = async () => {
  const mysql = require("mysql2/promise")

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  })

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`)
  console.log(`Database ${DB_NAME} created or already exists.`)
  await connection.end()
}

// Initialize and synchronize the database
const initializeDatabase = async () => {
  try {
    await createDatabase()
    await sequelize.authenticate()
    console.log("Connection established with the database.")

    await sequelize.sync()
    console.log("Databases are synced...")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = { sequelize, initializeDatabase }
