const { DataTypes } = require('sequelize');
const moment = require('moment');

// 文章信息表
module.exports = (sequelize) => {
  sequelize.define(
    'infoArticle',
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      cateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '分类Id',
      },
      decription: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      isUsing: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false,
        comment: '是否启用,默认为是',
      },
      sort: {
        type: DataTypes.INTEGER,
        defaultValue: 99,
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
      tableName: 'info_article',
    },
    {
      indexes: [
        {
          fields: ['title'],
        },
      ],
    }
  );
};
