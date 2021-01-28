const express = require('express')

// Create express instance
const app = express()
const bodyParser = require('body-parser')// 解析,用req.body获取post参数
const helmet = require('helmet')

const { makeHandlerAwareOfAsyncErrors } = require('./helpers')

// Require Universal middlewares
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(helmet())

// import login router
const loginRouter = require('./auth/login')
app.use(require('./auth/register'))
app.use(loginRouter.router)

// Require Authentication middleware
const auth = require('./auth/auth')

// Import Authentication middleware
app.use(auth)

// Import API Routes
const routes = [
  require('./routes/test')
]

// Import routes middlewares
routes.forEach((route) => {
  app.use(route)
})

const restAPIs = {
  users: require('./routes/users'),
  cates: require('./routes/cates'),
  roles: require('./routes/roles'),
  attrs: require('./routes/attrs'),
  groups: require('./routes/groups')
}

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(restAPIs)) {
  if (routeController.getAll) {
    app.get(`/${routeName}/list`, makeHandlerAwareOfAsyncErrors(routeController.getAll)
    )
  }
  if (routeController.getById) {
    app.get(`/${routeName}/:id`, makeHandlerAwareOfAsyncErrors(routeController.getById)
    )
  }
  if (routeController.create) {
    app.post(`/${routeName}/add`, makeHandlerAwareOfAsyncErrors(routeController.create)
    )
  }
  if (routeController.update) {
    app.put(`/${routeName}/:id`, makeHandlerAwareOfAsyncErrors(routeController.update)
    )
  }
  if (routeController.remove) {
    app.delete(`/${routeName}/:id`, makeHandlerAwareOfAsyncErrors(routeController.remove)
    )
  }
}

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  // res.status(err.status || 500)
  // res.render("error");
  res.status(500).json({
    msg: err.message
  })
})

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
