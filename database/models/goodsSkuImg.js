const { DataTypes } = require('sequelize');
const moment = require('moment');

// 商品SPU图片
module.exports = (sequelize) => {
  sequelize.define(
    'goodsSkuImg',
    {
      skuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品规格Id',
      },
      name: {
        type: DataTypes.STRING(50),
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      default: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'goods_sku_img',
    }
  );
};
