const { DataTypes } = require('sequelize')
const moment = require('moment')

// 用户登录信息与用户角色连接表
module.exports = (sequelize) => {
  sequelize.define(
    'mtmUserRole',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
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
      tableName: 'mtm_user_role'
    }
  )
}
