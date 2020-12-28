const moment = require('moment')
const { Op, literal } = require('sequelize')
const { models } = require('../../database')
const { getIdParam, genPassword, verifyParams } = require('../helpers')

const getAll = async (req, res) => {
  const params = req.query
  if (+params.p === 1) {
    params.timeStamp = moment().format('YYYY-MM-DD HH:mm:ss')
  }
  const msg = verifyParams(params, [
    {
      key: 'p',
      rule: 'required',
      alias: 'p'
    },
    {
      key: 'pageSize',
      rule: 'required',
      alias: 'pageSize'
    },
    {
      key: 'timeStamp',
      rule: +params.p > 1 ? 'required' : 'ignored',
      alias: 'timeStamp'
    }
  ])
  if (msg) {
    throw new Error(msg)
  }
  const where = {
    createdAt: {
      [Op.lte]: moment(params.timeStamp)
    },
    id: {
      // 添加管理员身份的id数组的子查询,另一种方法是通过models先查询出对应的id数组
      [Op.notIn]: literal(
        `(SELECT DISTINCT u.id FROM user_login AS u
            JOIN mtm_user_role AS j ON u.id = j.userId
            JOIN user_role as r ON j.roleId = r.id
            WHERE j.roleId = 2)`
      )
    }
  }
  if (params.name) {
    where.userName = {
      [Op.substring]: params.name
    }
  }
  if (params.status) {
    where.status = {
      [Op.eq]: +params.status
    }
  }
  if (params.role) {
    where.id[Op.in] = literal(
      `(SELECT DISTINCT u.id FROM user_login AS u
            JOIN mtm_user_role AS j ON u.id = j.userId
            JOIN user_role as r ON j.roleId = r.id
            WHERE j.roleId = ${+params.role})`
    )
  }
  const users = await models.userLogin.findAndCountAll({
    limit: +params.pageSize,
    offset: +params.pageSize * (+params.p - 1),
    attributes: ['userName', 'createdAt', 'id', 'status'],
    where,
    // count不计数重复主键
    distinct: true,
    include: [{
      model: models.userRole,
      attributes: ['id', 'name'],
      // 去掉多对多连接表的查询数据,只留下目标表的内容
      through: { attributes: [] }
    }]
  })
  res.status(200).json({
    status: 1,
    data: users.rows,
    total: users.count,
    p: +params.p,
    timeStamp: +params.p === 1 ? moment().format('YYYY-MM-DD HH:mm:ss') : params.timeStamp
  })
}

const getById = async (req, res) => {
  const id = getIdParam(req)
  const user = await models.userLogin.findByPk(id, {
    attributes: ['id', 'userName', 'question', 'answer', 'status'],
    include: [
      {
        model: models.userRole,
        attributes: ['id', 'name'],
        // 去掉多对多连接表的查询数据,只留下目标表的内容
        through: { attributes: [] }
      }
    ]
  })
  if (user) {
    res.status(200).json(user)
  } else {
    throw new Error('用户不存在')
  }
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
  let params = req.body
  const msg = verifyParams(params, [
    {
      key: 'userName',
      rule: 'required',
      alias: '用户名'
    },
    // {
    //   key: 'password',
    //   rule: 'required',
    //   alias: '密码'
    // },
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
    const user = await models.userLogin.findByPk(id)
    if (params.password) {
      const hashAndSalt = genPassword(params.password)
      params = { ...params, ...hashAndSalt }
    }
    user.update(params)
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
  getById,
  create,
  update,
  remove
}
