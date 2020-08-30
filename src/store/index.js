const { MongoClient, Db } = require('mongodb')

/**
 * @property {Db} db
 */
const state = {
  db: null
}

module.exports = {
  /**@returns {Db} */
  db: () => state.db,
  connect: (url, done) => {
    const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

    mongoClient.connect((err, client) => {
      if (err) {
        return done(err)
      }

      state.db = client.db()
      done()
    })
  },
  close: (done) => {
    state.db.close((err) => {
      if (err) {
        return done(err)
      }

      done()
    })
  }
}