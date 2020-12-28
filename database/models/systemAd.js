const { DataTypes } = require('sequelize');
const moment = require('moment');

// 广告信息表
module.exports = (sequelize) => {
  sequelize.define(
    'systemAd',
    {
      positionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '广告位Id',
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 99,
      },
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1.电脑端 2.移动端',
      },
      isUsing: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '是否启用,默认为是',
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
      tableName: 'system_ad',
    }
  );
};
