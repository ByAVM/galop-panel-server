require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParserJson = require('body-parser').json
const history = require('connect-history-api-fallback')

const mongo = require('./src/store')

const app = express()

app.use(history())
app.use(bodyParserJson())
app.use(cors())
app.use(require('./src/routes'))

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, PORT } = process.env
const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

process.on('beforeExit', () => {
  mongo.close((err) => {
    console.log(err)
  })
})

mongo.connect(url, (err) => {
  if (err) {
    console.log(err)
    return
  }

  app.listen(PORT, () => {
    console.log('server started on port: ' + PORT)
  })
})

