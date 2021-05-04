const express = require("express")
const mysql = require("mysql")
require("dotenv").config()
const path = require("path")

const app = express()
app.use(express.json()) // parses incoming requests with JSON payloads

//create connection to database
const db = mysql.createPool({
  host: process.env.DB_HOST, //localhost
  user: process.env.DB_USER, //root
  password: process.env.DB_PASSWORD, //password
  database: process.env.DB, //heroku_c882d7526ac8a9c
})

app.get("/test", (req, res) => {
  res.json({ sensorID: 9999999, sensorValue: 9999 })
})

app.get("/sensor", (req, res) => {
  db.query("SELECT * FROM sensor_profile   ", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.get("/data", (req, res) => {
  db.query("SELECT * FROM sensor_data   ", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.post("/sensor", (req, res) => {
  const insertQuery = "INSERT INTO sensor_profile SET ?"
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Profile Added to Database")
    }
  })
})

app.post("/data", (req, res) => {
  const insertQuery = "INSERT INTO sensor_data SET ?"
  db.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send("Data Added to Database")
    }
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port)
})
