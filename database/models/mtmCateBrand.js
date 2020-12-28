const { DataTypes } = require('sequelize');
const moment = require('moment');

// 商品分类与商品品牌连接表
module.exports = (sequelize) => {
  sequelize.define(
    'mtmCateBrand',
    {
      cateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'mtm_cate_brand',
    }
  );
};
