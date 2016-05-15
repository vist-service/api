import Koa from 'koa'
import Router from 'koa-router'
import body from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import github from 'octonode'
import pify from 'pify'
import {isDev} from './utils'
import config from './config'

// build github client
const client = github.client({
  id: config.github.id,
  secret: config.github.secret
})

const app = new Koa()

const router = new Router()

// redirect to github login page
router.get('/login', ctx => {
  ctx.body = 'redirecting...'
  const authURL = github.auth.config({
    id: config.github.id,
    secret: config.github.secret
  }).login(['user:email', 'gist'])
  ctx.redirect(authURL)
})

// retrieve github token
router.get('/login/callback', async ctx => {
  const code = ctx.query.code
  try {
    const token = await pify(github.auth).login(code)
    ctx.redirect(`/login/success?token=${token}`)
  } catch (e) {
    ctx.body = e.message
  }
})

if (isDev) {
  app.use(convert(logger()))
}
app.use(router.routes())
app.use(body())

app.use(async ctx => {
  ctx.body = 'hello'
})

app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`)
})
