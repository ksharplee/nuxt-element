const { DataTypes } = require('sequelize');
const moment = require('moment');

// 客户等级表
module.exports = (sequelize) => {
  sequelize.define(
    'userRank',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      desc: {
        type: DataTypes.STRING,
      },
      startPoint: {
        type: DataTypes.INTEGER,
        comment: '开始积分',
      },
      endPoint: {
        type: DataTypes.INTEGER,
        comment: '结束积分',
      },
      rebate: {
        type: DataTypes.INTEGER,
        comment: '折扣',
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
    },
    {
      tableName: 'user_rank',
    }
  );
};
