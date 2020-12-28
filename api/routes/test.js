// Test route
const express = require('express')
const router = express.Router()

router.get('/test', function (req, res, next) {
  res.status(200).json({
    test: 'Test API GET!'
  })
})

module.exports = router
