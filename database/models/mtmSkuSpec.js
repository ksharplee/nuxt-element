const { DataTypes } = require('sequelize');
const moment = require('moment');

// 商品Sku、商品规格属性名与商品规格属性值连接表
module.exports = (sequelize) => {
  sequelize.define(
    'mtmSkuSpec',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      skuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      optionId: {
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
      tableName: 'mtm_sku_spec',
    }
  );
};
