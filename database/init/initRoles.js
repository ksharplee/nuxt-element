module.exports = (sequelize) => {
  const Role = sequelize.models.userRole;

  // 角色
  const roles = [
    { type: 0, name: '采购商' },
    { type: 1, name: '供应商' },
    { type: 2, name: '管理员' },
  ];

  roles.forEach(async (role) => {
    await Role.create(role);
  });
}
