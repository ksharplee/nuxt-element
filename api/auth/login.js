const express = require('express')
const router = express.Router()
const { models } = require('../../database')

const {
  validatePassword,
  generateToken,
  verifyParams,
  makeHandlerAwareOfAsyncErrors
} = require('../helpers')

const login = makeHandlerAwareOfAsyncErrors(async (req, res, next) => {
  const params = req.body
  const msg = verifyParams(params, [
    {
      key: 'userName',
      rule: 'required',
      alias: '用户名'
    },
    {
      key: 'password',
      rule: 'required',
      alias: '密码'
    }
  ])
  if (msg) {
    throw new Error(msg)
  }
  const user = await models.userLogin.findOne({
    where: {
      userName: params.userName
    }
  })
  if (!user) {
    throw new Error('用户不存在')
  } else if (validatePassword(params.password, user.hash, user.salt)) {
    user.setDataValue(
      'userRoles',
      await user.getUserRoles({ attributes: ['id', 'name'] })
    )
    const token = generateToken({ id: user.id, userName: user.userName })
    res.status(200).json({
      status: 1,
      data: user.dataValues,
      token,
      msg: '登录成功'
    })
  } else {
    throw new Error('密码错误')
  }
})

router.post(
  '/auth/login',
  login
)

module.exports = { router, login }
