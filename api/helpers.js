// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const getIdParam = (req) => {
  const id = req.params.id
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10)
  }
  throw new TypeError(`无效的id,参数: "${id}"`)
}

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return {
    salt,
    hash
  }
}

const validatePassword = (password, hash, salt) => {
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return hash === genHash
}

// We create a wrapper to workaround async errors not being transmitted correctly.
const makeHandlerAwareOfAsyncErrors = (handler) => {
  return async function (req, res, next) {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

// Define Token generation function
const generateToken = (payload = {}) => {
  // Change milliseconds into seconds
  const created = Math.floor(Date.now() / 1000)
  const privateKey = fs.readFileSync(path.join(__dirname, './id_rsa_priv.pem'))
  const token = jwt.sign(
    {
      ...payload,
      // Expires in 1 day
      exp: created + 3600 * 24
    },
    privateKey,
    { algorithm: 'RS256' }
  )
  return token
}

// Define Token verification function
const verifyToken = (token, callback) => {
  const publicKey = fs.readFileSync(path.join(__dirname, './id_rsa_pub.pem'))
  return jwt.verify(token && token.substring(7), publicKey, callback)
}

const rules = {
  required: (value, alias) => (!value ? `[${alias}不能为空]` : ''),
  array: (arr, alias) => (!arr.length ? `[请至少选择一个${alias}]` : ''),
  ignored: () => ''
}

const verifyParams = (params, rule = []) => {
  const arr = []
  rule.forEach((item) => {
    const res = rules[item.rule](params[item.key], item.alias)
    if (res) {
      arr.push(res)
    }
    return item
  })
  return arr.length && `参数错误:${arr.join('')}`
}

module.exports = {
  getIdParam,
  genPassword,
  validatePassword,
  makeHandlerAwareOfAsyncErrors,
  generateToken,
  verifyToken,
  verifyParams
}
