const { DataTypes } = require('sequelize')
const moment = require('moment')

// 平台属性名称表
module.exports = (sequelize) => {
  sequelize.define(
    'baseCateAttr',
    {
      cateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品类别Id'
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      isUsing: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '是否在搜索时启用,默认为是'
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
      tableName: 'base_cate_attr'
    }
  )
}
