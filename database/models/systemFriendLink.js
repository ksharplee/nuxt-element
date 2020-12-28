const { DataTypes } = require('sequelize');
const moment = require('moment');

// 友情链接表
module.exports = (sequelize) => {
  sequelize.define(
    'systemFriendLink',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 99,
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
      tableName: 'system_friend_link',
    }
  );
};
