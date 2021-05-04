const express = require("express")
const mysql = require("mysql")
require("dotenv").config()
const path = require("path")

const app = express()
app.use(express.json()) // parses incoming requests with JSON payloads

// declare react files in build as static
app.use(express.static(path.join(__dirname, "build")))

// serve index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

//create connection to database
const db = mysql.createPool({
  host: process.env.DB_HOST, //localhost
  user: process.env.DB_USER, //root
  password: process.env.DB_PASSWORD, //password
  database: process.env.DB, //ravenbooks
})

app.get("/index", (req, res) => {
  res.json({ answer: 42, hello: "world" })
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
