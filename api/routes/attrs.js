// import { Op } from 'sequelize'
// import R from '../../assets/js/ramda'
const { models } = require('../../database')
const { getIdParam } = require('../helpers')

const getAll = async (req, res) => {
  const attrs = await models.baseCateAttr.findAll({
    include: {
      model: models.baseCateAttrOption,
      as: 'options',
      attributes: ['id', 'option']
    }
  })
  res.status(200).json({
    status: 1,
    data: attrs
  })
}

const getById = async (req, res) => {
  const id = getIdParam(req)
  const cateAttr = await models.baseCateAttr.findByPk(id)
  res.status(200).json(cateAttr)
}

const create = async (req, res) => {
  const params = req.body
  if (req.body.id) {
    throw new Error('分类已存在')
  } else {
    const cate = await models.baseCateAttr.create({
      name: params.name,
      parentPath: params.parentPath,
      parentId: params.parentId,
      level: params.level
    })
    if (params.parentId !== 0) {
      const parent = await models.baseCateAttr.findByPk(params.parentId)
      parent.update({
        leaf: 0
      })
    }
    res.status(201).json({
      status: 1,
      data: cate
    })
  }
}

const update = async (req, res) => {
  const id = getIdParam(req)
  const params = req.body
  if (req.body.id === id) {
    await models.baseCateAttr.update(params, {
      where: {
        id
      }
    })
    res.status(200).end()
  } else {
    throw new Error('参数错误:【ID不同】')
  }
}

const remove = async (req, res) => {
  const id = getIdParam(req)
  const existGoods = await models.goodsSpu.findOne({
    where: {
      cateId: id
    }
  })
  if (existGoods) {
    throw new Error('此分类下存在商品，不能删除')
  }
  const existChild = await models.baseCateAttr.findOne({
    where: {
      parentId: id
    }
  })
  if (existChild) {
    throw new Error('此分类存在子分类，不能删除')
  }
  const cate = await models.baseCateAttr.findByPk(id)
  const parent = await models.baseCateAttr.findByPk(cate.parentId)
  await cate.destroy()
  const hasChild = await models.baseCateAttr.findOne({
    where: {
      parentId: parent.id
    }
  })
  if (!hasChild) {
    await parent.update({
      leaf: 1
    })
  }
  res.status(200).end()
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
