const router = require('express').Router()
const productsController = require('../controllers/products')
const userController = require('../controllers/user')

router.get('/api/products/list/:store/:page', productsController.list)
router.post('/api/login', userController.login)

module.exports = router