const { DataTypes } = require('sequelize');
const moment = require('moment');

// 商品SKU表
module.exports = (sequelize) => {
  sequelize.define(
    'goodsSku',
    {
      spuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品Id',
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '',
      },
      caption: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '副标题',
      },
      sales: {
        type: DataTypes.INTEGER,
      },
      comments: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      costPrice: {
        type: DataTypes.INTEGER,
        comment: '成本价',
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isShelved: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '是否上架',
      },
      defaultImg: {
        type: DataTypes.STRING,
        comment: '默认图片',
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
      tableName: 'goods_sku',
    }
  );
};
