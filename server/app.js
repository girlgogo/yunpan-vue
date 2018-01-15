const Koa = require('koa')
const log = require('npmlog')
const logger = require('koa-logger')
const CSRF = require('koa-csrf')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static-server')

process.env.PORT = process.env.PORT || 8085

global.__CLIENT__ = false

global.__SERVER__ = true

const app = new Koa()

app.use(new CSRF({}))
app.use(logger())
app.use(session(app))
app.use(bodyParser())
app.use(koaStatic({
  rootDir: './dist',
  index: 'index.html'
}))

app.listen(process.env.PORT, (error) => {
  if (error) {
    log.error(error)
  } else {
    log.info(`==> Listening on port ${process.env.PORT}.`)
  }
})
