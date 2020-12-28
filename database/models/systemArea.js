const { DataTypes } = require('sequelize');
const moment = require('moment');

// 大陆地区表
module.exports = (sequelize) => {
  sequelize.define(
    'systemArea',
    {
      areaId: {
        type: DataTypes.CHAR(6),
        allowNull: false,
        unique: true,
        comment: '6位地址id',
      },
      areaName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      areaType: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '1.省 2.市 3.区',
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
      tableName: 'system_area',
    }
  );
};
