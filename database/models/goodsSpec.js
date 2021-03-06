const { DataTypes } = require('sequelize')
const moment = require('moment')

// 商品规格属性表
module.exports = (sequelize) => {
  sequelize.define(
    'goodsSpec',
    {
      spuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品Id'
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
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
      tableName: 'goods_spec'
    }
  )
}
