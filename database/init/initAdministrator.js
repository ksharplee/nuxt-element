const crypto = require('crypto');

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    salt,
    hash,
  };
};

module.exports = async (sequelize) => {
  const user = sequelize.models.userLogin;

  const { hash, salt } = genPassword('123456');
  const admin = await user.create({
    userName: 'administrator',
    hash,
    salt,
  });
  await admin.setUserRoles([2, 1, 3])
  // const adminRoles = await admin.getUserRoles();
  // console.log('函数 ~ file: initAdministrator.js ~ line 12 ~ role', adminRoles.map(item => item.dataValues.id));
}
