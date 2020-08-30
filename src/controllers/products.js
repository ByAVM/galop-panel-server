const { db } = require('../store')

/**
 * @type {RequestHandler}
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function list(req, res) {
  const availableCollections = [
    'loesdau',
    'hkm'
  ]

  const collection = req.params.store
  const page = req.params.page ? req.params.page : 1 

  if (availableCollections.indexOf(collection) === -1) {
    res.json({error: 'Products for this shop not found'})
    return
  }
  if (page == 0) {
    res.json({error: 'Page can not be zero'})
    return
  }

  const count = db().collection(collection).countDocuments()

  const size = 20
  const products = db().collection(collection)
    .find()
    .skip((page-1) * size)
    .limit(size)
    .toArray()

  Promise.all([count, products]).then(results => {
    res.json({
      meta: {
        count: results[0],
        pages: Math.ceil(results[0] / size)
      },
      products: results[1]
    })
  })
  .catch(error => {
    res.json({ error })
  })
}

module.exports = {
  list
}