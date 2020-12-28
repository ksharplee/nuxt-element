const { DataTypes } = require('sequelize');
const moment = require('moment');

// 用户收货地址表
module.exports = (sequelize) => {
  sequelize.define(
    'userAddress',
    {
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'UserProfile Id',
      },
      contacts: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      areaIdPath: {
        type: DataTypes.CHAR(6),
        allowNull: false,
        comment: '6位地址id,省市区',
      },
      areaName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '详细地址',
      },
      default: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      zipcode: {
        type: DataTypes.STRING,
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
      tableName: 'user_address',
    }
  );
};
