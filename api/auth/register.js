const express = require('express')
const router = express.Router()
const {
  makeHandlerAwareOfAsyncErrors
} = require('../helpers')
const { create } = require('../routes/users')
const { login } = require('./login')

router.post(
  '/register',
  makeHandlerAwareOfAsyncErrors(async (req, res, next) => {
    req.params.isRegister = true
    await create(req)
    next()
  }),
  login
)

module.exports = router

// const express = require("express");
// const router = express.Router();
// const { models } = require("../../database");
// const {
//   genPassword,
//   generateToken,
//   verifyParams,
//   makeHandlerAwareOfAsyncErrors
// } = require("../helpers");

// router.post(
//   "/register",
//   makeHandlerAwareOfAsyncErrors(async (req, res) => {
//     const params = req.body;
//     const msg = verifyParams(params, [
//       {
//         key: "userName",
//         rule: "required",
//         alias: "用户名"
//       },
//       {
//         key: "password",
//         rule: "required",
//         alias: "密码"
//       },
//       {
//         key: "userRoles",
//         rule: "array",
//         alias: "角色"
//       }
//     ]);
//     if (msg) {
//       throw new Error(msg);
//     }
//     const { hash, salt } = genPassword(params.password);
//     const result = await models.userLogin.findOne({
//       where: {
//         userName: params.userName
//       }
//     });
//     if (result) {
//       throw new Error("用户已存在");
//     } else {
//       const user = await models.userLogin.create({
//         userName: params.userName,
//         hash,
//         salt
//       });
//       const roles = await models.userRole.findAll({
//         where: {
//           id: params.userRoles
//         }
//       });
//       await user.setUserRoles(roles);
//       user.setDataValue(
//         "userRoles",
//         await user.getUserRoles({ attributes: ["id", "name"] })
//       );
//       const data = user.dataValues;
//       const token = generateToken({ id: data.id, userName: data.userName });
//       res.status(200).json({
//         status: 1,
//         data,
//         token,
//         msg: "登录成功"
//       });
//     }
//   })
// );

// module.exports = router;
