const { DataTypes } = require('sequelize')
const moment = require('moment')

// 商品SPU表
module.exports = (sequelize) => {
  sequelize.define(
    'goodsSpu',
    {
      cateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品类别Id'
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      descDetail: {
        type: DataTypes.STRING,
        comment: '商品详情'
      },
      sales: {
        type: DataTypes.INTEGER
      },
      comments: {
        type: DataTypes.INTEGER
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
      tableName: 'goods_spu'
    }
  )
}
