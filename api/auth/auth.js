const { verifyToken } = require('../helpers')

const auth = (req, res, next) => {
  verifyToken(req.headers.authorization, (err, decoded) => {
    if (err) {
      let msg = '您的访问权限已失效,请重新登录'
      if (err.name === 'TokenExpiredError') {
        msg = '访问超时,请重新登录'
      }
      throw new Error(msg)
    } else {
      next()
    }
  })
}

module.exports = auth
