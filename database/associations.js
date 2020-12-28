// 表关系定义

module.exports = (sequelize) => {
  const Models = sequelize.models

  // 文章类别与文章一对多
  Models.infoCategory.hasMany(Models.infoArticle, {
    foreignKey: 'cateId',
    onDelete: 'CASCADE'
  })
  Models.infoArticle.belongsTo(Models.infoCategory, {
    foreignKey: 'cateId',
    onDelete: 'RESTRICT'
  })
  // 用户等级与用户信息一对多
  Models.userRank.hasMany(Models.userProfile, {
    foreignKey: 'rankId',
    onDelete: 'CASCADE'
  })
  Models.userProfile.belongsTo(Models.userRank, {
    foreignKey: 'rankId',
    onDelete: 'RESTRICT'
  })
  // 用户与用户信息一对一
  Models.userLogin.hasOne(Models.userProfile, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  })
  Models.userProfile.belongsTo(Models.userLogin, {
    foreignKey: 'userId',
    onDelete: 'RESTRICT'
  })
  // 用户与角色多对多
  Models.userLogin.belongsToMany(Models.userRole, {
    foreignKey: 'userId',
    otherKey: 'roleId',
    through: Models.mtmUserRole
  })
  Models.userRole.belongsToMany(Models.userLogin, {
    foreignKey: 'roleId',
    otherKey: 'userId',
    through: Models.mtmUserRole
  })
  // 用户信息与用户收货地址一对多
  Models.userProfile.hasMany(Models.userAddress, {
    foreignKey: 'profileId',
    onDelete: 'CASCADE'
  })
  Models.userAddress.belongsTo(Models.userProfile, {
    foreignKey: 'profileId',
    onDelete: 'RESTRICT'
  })
  // 广告位置与广告一对多
  Models.systemAdPosition.hasMany(Models.systemAd, {
    foreignKey: 'positionId',
    onDelete: 'CASCADE'
  })
  Models.systemAd.belongsTo(Models.systemAdPosition, {
    foreignKey: 'positionId',
    onDelete: 'RESTRICT'
  })
  // 商品分类与品牌多对多
  Models.baseCate.belongsToMany(Models.baseCateBrand, {
    foreignKey: 'cateId',
    otherKey: 'brandId',
    through: Models.mtmCateBrand
  })
  Models.baseCateBrand.belongsToMany(Models.baseCate, {
    foreignKey: 'brandId',
    otherKey: 'cateId',
    through: Models.mtmCateBrand
  })
  // 商品分类分组与商品分类一对多
  Models.baseCateGroup.hasMany(Models.baseCate, {
    foreignKey: 'groupId',
    onDelete: 'RESTRICT'
  })
  Models.baseCate.belongsTo(Models.baseCateGroup, {
    foreignKey: 'groupId',
    onDelete: 'RESTRICT'
  })
  // 商品分类与平台属性一对多
  Models.baseCate.hasMany(Models.baseCateAttr, {
    foreignKey: 'cateId',
    onDelete: 'CASCADE'
  })
  Models.baseCateAttr.belongsTo(Models.baseCate, {
    foreignKey: 'cateId',
    onDelete: 'RESTRICT'
  })
  // 平台属性与平台属性值一对多
  Models.baseCateAttr.hasMany(Models.baseCateAttrOption, {
    foreignKey: 'attrId',
    onDelete: 'CASCADE'
  })
  Models.baseCateAttrOption.belongsTo(Models.baseCateAttr, {
    foreignKey: 'attrId',
    onDelete: 'RESTRICT'
  })
  // 商品分类与商品SPU一对多
  Models.baseCate.hasMany(Models.goodsSpu, {
    foreignKey: 'cateId',
    onDelete: 'RESTRICT'
  })
  Models.goodsSpu.belongsTo(Models.baseCate, {
    foreignKey: 'cateId',
    onDelete: 'RESTRICT'
  })
  // 商品SPU与商品SPEC属性一对多
  Models.goodsSpu.hasMany(Models.goodsSpec, {
    foreignKey: 'spuId',
    onDelete: 'CASCADE'
  })
  Models.goodsSpec.belongsTo(Models.goodsSpu, {
    foreignKey: 'spuId',
    onDelete: 'RESTRICT'
  })
  // 商品SPEC属性与商品SPEC属性值一对多
  Models.goodsSpec.hasMany(Models.goodsSpecOption, {
    foreignKey: 'specId',
    onDelete: 'CASCADE'
  })
  Models.goodsSpecOption.belongsTo(Models.goodsSpec, {
    foreignKey: 'specId',
    onDelete: 'RESTRICT'
  })
  // 商品SPU与商品SKU一对多
  Models.goodsSpu.hasMany(Models.goodsSku, {
    foreignKey: 'spuId',
    onDelete: 'CASCADE'
  })
  Models.goodsSku.belongsTo(Models.goodsSpu, {
    foreignKey: 'spuId',
    onDelete: 'RESTRICT'
  })
  // 商品SKU与商品图片一对多
  Models.goodsSku.hasMany(Models.goodsSkuImg, {
    foreignKey: 'skuId',
    onDelete: 'CASCADE'
  })
  Models.goodsSkuImg.belongsTo(Models.goodsSku, {
    foreignKey: 'skuId',
    onDelete: 'RESTRICT'
  })
  // 商品SKU与商品SPEC属性超级多对多,通过mtmSkuSpec连接
  Models.goodsSku.belongsToMany(Models.goodsSpec, {
    foreignKey: 'skuId',
    otherKey: 'specId',
    through: Models.mtmSkuSpec
  })
  Models.goodsSpec.belongsToMany(Models.goodsSku, {
    foreignKey: 'specId',
    otherKey: 'skuId',
    through: Models.mtmSkuSpec
  })
  Models.goodsSku.hasMany(Models.mtmSkuSpec, {
    foreignKey: 'skuId',
    onDelete: 'RESTRICT'
  })
  Models.mtmSkuSpec.belongsTo(Models.goodsSku, {
    foreignKey: 'skuId',
    onDelete: 'RESTRICT'
  })
  Models.goodsSku.hasMany(Models.mtmSkuSpec, {
    foreignKey: 'specId',
    onDelete: 'RESTRICT'
  })
  Models.mtmSkuSpec.belongsTo(Models.goodsSku, {
    foreignKey: 'specId',
    onDelete: 'RESTRICT'
  })
  // 商品SKU与商品SPEC属性值超级多对多
  Models.goodsSku.belongsToMany(Models.goodsSpecOption, {
    foreignKey: 'skuId',
    otherKey: 'specId',
    through: Models.mtmSkuSpec
  })
  Models.goodsSpecOption.belongsToMany(Models.goodsSku, {
    foreignKey: 'optionId',
    otherKey: 'skuId',
    through: Models.mtmSkuSpec
  })
  Models.goodsSku.hasMany(Models.mtmSkuSpec, {
    foreignKey: 'skuId',
    onDelete: 'RESTRICT'
  })
  Models.mtmSkuSpec.belongsTo(Models.goodsSku, {
    foreignKey: 'skuId',
    onDelete: 'RESTRICT'
  })
  Models.goodsSku.hasMany(Models.mtmSkuSpec, {
    foreignKey: 'optionId',
    onDelete: 'RESTRICT'
  })
  Models.mtmSkuSpec.belongsTo(Models.goodsSku, {
    foreignKey: 'optionId',
    onDelete: 'RESTRICT'
  })
}
