const { DataTypes } = require('sequelize')
const moment = require('moment')

// 商品分类表
module.exports = (sequelize) => {
  sequelize.define(
    'baseCate',
    {
      groupId: {
        type: DataTypes.INTEGER,
        comment: '商品类别分组Id'
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      img: {
        type: DataTypes.STRING
      },
      parentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      parentPath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      decription: {
        type: DataTypes.STRING
      },
      isUsing: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '是否启用,1为是,0为否'
      },
      level: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '分类等级，默认1级'
      },
      leaf: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '分类是否为叶子节点(即最后一级),1为是,0为否'
      },
      inGroupTitle: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        comment: '是否作为分类分组标题显示,1为是,0为否'
      },
      sort: {
        type: DataTypes.INTEGER,
        defaultValue: 99
      },
      createdAt: {
        type: DataTypes.DATE,
        get () {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get () {
          return moment(this.getDataValue('updatedAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
      }
    },
    {
      tableName: 'base_cate'
    }
  )
}
