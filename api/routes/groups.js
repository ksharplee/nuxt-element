// const moment = require('moment')
// const { Op } = require('sequelize')
const { models } = require('../../database')
const { getIdParam, verifyParams } = require('../helpers')

const getAll = async (req, res) => {
  const roles = await models.baseCateGroup.findAll({
    include: [
      {
        model: models.baseCate,
        attributes: ['id', 'name'],
        as: 'cates'
      }
    ]
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
      key: 'name',
      rule: 'required',
      alias: '分组名称'
    }
  ])
  if (msg) {
    throw new Error(msg)
  }
  const group = await models.baseCateGroup.create(params)
  if (params.cates) {
    await group.setBaseCates(params.cates)
  }
  res.status(201).end()
}

const update = async (req, res) => {
  const id = getIdParam(req)
  const params = req.body
  const msg = verifyParams(params, [
    {
      key: 'name',
      rule: 'required',
      alias: '分组名称'
    }
  ])
  if (msg) {
    throw new Error(msg)
  }
  if (req.body.id === id) {
    const group = await models.baseCateGroup.findByPk(id)
    await group.update(params)
    if (params.cates) {
      await group.setBaseCates(params.cates)
    }
    res.status(200).end()
  } else {
    throw new Error('参数错误:【ID不同】')
  }
}

const remove = async (req, res) => {
  const id = getIdParam(req)
  await models.baseCateGroup.destroy({
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
