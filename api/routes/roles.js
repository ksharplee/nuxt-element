// const moment = require('moment')
const { Op } = require('sequelize')
const { models } = require('../../database')
const { getIdParam, genPassword, verifyParams } = require('../helpers')

const getAll = async (req, res) => {
  const roles = await models.userRole.findAll({
    where: {
      id: {
        [Op.ne]: 2
      }
    }
  })
  res.status(200).json({
    status: 1,
    data: roles
  })
}

const create = async (req, res) => {
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
    },
    {
      key: 'userRoles',
      rule: 'array',
      alias: '角色'
    }
  ])
  if (msg) {
    throw new Error(msg)
  }
  const existUser = await models.userLogin.findOne({
    where: {
      userName: params.userName
    }
  })
  if (existUser || req.body.id) {
    throw new Error('用户已存在')
  } else {
    const hashAndSalt = genPassword(params.password)
    const user = await models.userLogin.create({
      userName: params.userName,
      question: params.question,
      answer: params.answer,
      ...hashAndSalt
    })
    const roles = await models.userRole.findAll({
      where: {
        id: params.userRoles
      }
    })
    await user.setUserRoles(roles)
    res.status(201).end()
  }
}

const update = async (req, res) => {
  const id = getIdParam(req)
  const params = req.body
  const msg = verifyParams(params, [
    {
      key: 'userName',
      rule: 'required',
      alias: '用户名'
    },
    {
      key: 'userRoles',
      rule: 'array',
      alias: '角色'
    }
  ])
  if (msg) {
    throw new Error(msg)
  }

  // We only accept an UPDATE request if the `:id` param matches the body `id`
  if (req.body.id === id) {
    // const hashAndSalt = genPassword(params.password)
    const user = await models.userLogin.findByPk(id)
    user.update(
      {
        userName: params.userName,
        question: params.question,
        answer: params.answer,
        status: params.status
        // ...hashAndSalt
      }
    )
    const roles = await models.userRole.findAll({
      where: {
        id: params.userRoles
      }
    })
    await user.setUserRoles(roles)
    res.status(200).end()
  } else {
    throw new Error('参数错误:【ID不同】')
  }
}

const remove = async (req, res) => {
  const id = getIdParam(req)
  await models.userLogin.destroy({
    where: {
      id
    }
  })
  res.status(200).end()
}

module.exports = {
  getAll,
  // getById,
  create,
  update,
  remove
}
