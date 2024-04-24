const express = require("express")
const app = express()

const { quotes } = require("./data")
const { getRandomElement } = require("./utils")

const PORT = process.env.PORT || 4001

app.use(express.static("public"))

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Put these statements before you define any routes.
// app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())
app.get("/api/quotes/random", (req, res) => {
  const quote = getRandomElement(quotes)

  res.send({ quote })
})

app.get("/api/quotes", (req, res) => {
  res.send({ quotes })
})

app.post("/api/quotes", (req, res) => {
  if (req.query.quote && req.query.person) {
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person,
    }
    quotes.push(newQuote)
    res.status(200).send({ quote: newQuote })
  } else {
    res.status(400)
  }
})

app.listen(PORT, () => {
  console.log("the server is running")
})
