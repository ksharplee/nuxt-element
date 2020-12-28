const { DataTypes } = require('sequelize')
const moment = require('moment')

// 用户角色表
module.exports = (sequelize) => {
  sequelize.define(
    'userRole',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      },
      decription: {
        type: DataTypes.STRING
      },
      id: {
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '1.采购商 2.供应商 3.管理员'
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
      tableName: 'user_role'
    }
  )
}
