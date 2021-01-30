const { Sequelize } = require('sequelize')
const associate = require('./associations')

// 新建sequelize实例，分别传递参数'数据库名称', '连接账号', '密码', options
const sequelize = new Sequelize('online_store', 'ksharplee', '1985lee74', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00',
  logging: false
  // 记录日志 -- 显示所有日志函数调用参数
  // logging: (...msg) => console.log(msg)
})

const modelDefiners = [
  // 用户模块
  require('./models/userLogin'),
  require('./models/userRole'),
  require('./models/userProfile'),
  require('./models/userRank'),
  require('./models/userAddress'),
  // 系统模块
  require('./models/systemArea'),
  // 广告模块
  require('./models/systemAdPosition'),
  require('./models/systemAd'),
  // 文章模块
  require('./models/infoCategory'),
  require('./models/infoArticle'),
  // 平台模块
  require('./models/baseCate'),
  require('./models/baseCateGroup'),
  require('./models/baseCateBrand'),
  require('./models/baseCateAttr'),
  require('./models/baseCateAttrOption'),
  // 商品模块
  require('./models/goodsSpu'),
  require('./models/goodsSku'),
  require('./models/goodsSkuImg'),
  require('./models/goodsSpec'),
  require('./models/goodsSpecOption'),
  // 多对多连接表
  require('./models/mtmUserRole'),
  require('./models/mtmCateBrand'),
  require('./models/mtmCateAttr'),
  require('./models/mtmSkuSpec')
]

modelDefiners.forEach(modelDefiner => modelDefiner(sequelize))

associate(sequelize)

// (async () => {
//   await sequelize.sync({ alter: true })
// })()

module.exports = sequelize
