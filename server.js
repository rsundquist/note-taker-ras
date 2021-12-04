const express = require('express')
const path = require('path')
const notes = require('./db/db.json')
const fs = require('fs')


const app = express()

var PORT = process.env.PORT || 3001

// middleware
app.use(express.urlencoded({extened: true}))
app.use(express.json);
app.use(express.static("public"))


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

app.get('/api/notes', (req, res) => res.status(200).json(notes))

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)


//api routes

app.post("/api/notes", (req, res) => {
  var newNote = req.body;
  newNote["id"] = currentID +1
  currentID++;
  console.log(newNote)
  notes.push(newNote)
  newNotes();
  return res.status(200).end()
})

function newNotes() {
  fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
          console.log("error")
          return console.log(err)
      }
      console.log("Success!")
  })
}

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
