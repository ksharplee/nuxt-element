const { DataTypes } = require('sequelize');
const moment = require('moment');

// 用户个人信息表
module.exports = (sequelize) => {
  sequelize.define(
    'userProfile',
    {
      realName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      rankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '用户等级Id',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户Id',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '0.保密 1.男 2.女',
      },
      birthday: {
        type: DataTypes.DATE,
      },
      points: {
        type: DataTypes.INTEGER,
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
      tableName: 'user_profile',
    }
  );
};
