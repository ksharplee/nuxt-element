// import { Op } from 'sequelize'
import R from '../../assets/js/ramda'
const { models } = require('../../database')
// eslint-disable-next-line no-unused-vars
const { getIdParam, genPassword, verifyParams } = require('../helpers')

const getNeedsTree = async (id) => {
  let rootNeeds = await models.baseCate.findAll({
    where: {
      id
    },
    include: [
      {
        model: models.baseCateAttr,
        as: 'attrs',
        attributes: ['id', 'name'],
        include: {
          model: models.baseCateAttrOption,
          as: 'options',
          attributes: ['id', 'option']
        }
      }
    ]
  })
  rootNeeds = await getChildNeeds(rootNeeds)
  return rootNeeds
}

const getChildNeeds = async (rootNeeds) => {
  const expendPromise = []
  rootNeeds.forEach((item) => {
    expendPromise.push(
      models.baseCate.findAll({
        where: {
          parentId: item.id
        }
      })
    )
  })
  const child = await Promise.all(expendPromise)
  // eslint-disable-next-line prefer-const
  for (let [idx, item] of child.entries()) {
    if (item.length > 0) {
      item = await getChildNeeds(item)
    }
    rootNeeds[idx].setDataValue('children', item)
  }
  return rootNeeds
}

const getAll = async (req, res) => {
  // 递归CTE（common table expression）思路实现,先找出找出一级需求，再递归找出子需求。
  let cates = []
  if (!req.query.root) {
    cates = await models.baseCate.findAll({
      where: {
        parentId: 0
      }
    })
    const promises = []
    cates.forEach(cate => promises.push(getNeedsTree(cate.id)))
    Promise.all(promises).then((data) => {
      res.status(200).json({
        status: 1,
        data: R.unnest(data)
      })
    })
  } else {
    cates = await models.baseCate.findAll({
      where: {
        parentId: 0
      }
    })
    res.status(200).json({
      status: 1,
      data: cates
    })
  }

  // 查询最深的子级结果为三层。如果能保证数据继承关系最深为三层，可以使用此方法
  // const cates = await models.baseCate.findAll({
  //   where: {
  //     parentId: 0
  //   },
  //   include: {
  //     model: models.baseCate,
  //     as: 'children',
  //     // 如果为true，连接查询为内连接。false为左连接。如果有where默认为true，其他情况默认为false。
  //     required: false,
  //     include: {
  //       // 嵌套查询所有的模型
  //       all: true,
  //       // 嵌套查询
  //       nested: true
  //     }
  //   }
  // })
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
  if (req.body.id) {
    throw new Error('分类已存在')
  } else {
    const cate = await models.baseCate.create({
      name: params.name,
      parentPath: params.parentPath,
      parentId: params.parentId,
      level: params.level
    })
    if (params.parentId !== 0) {
      const parent = await models.baseCate.findByPk(params.parentId)
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
    await models.baseCate.update(params, {
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
  const existChild = await models.baseCate.findOne({
    where: {
      parentId: id
    }
  })
  if (existChild) {
    throw new Error('此分类存在子分类，不能删除')
  }
  const cate = await models.baseCate.findByPk(id)
  const parent = await models.baseCate.findByPk(cate.parentId)
  await cate.destroy()
  const hasChild = await models.baseCate.findOne({
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
