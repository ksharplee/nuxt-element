const area = require('../data/area')

const provinces = area.province_list
const cities = area.city_list
const counties = area.county_list

module.exports = async (sequelize) => {
  const Area = sequelize.models.systemArea

  for (const key in provinces) {
    await Area.create({
      areaId: key,
      areaName: provinces[key],
      areaType: 1
    })
  }

  for (const key in cities) {
    await Area.create({
      areaId: key,
      areaName: cities[key],
      areaType: 2
    })
  }

  for (const key in counties) {
    await Area.create({
      areaId: key,
      areaName: counties[key],
      areaType: 3
    })
  }
}
