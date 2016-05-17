import Koa from 'koa'
import Router from 'koa-router'
import body from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import github from 'octonode'
import pify from 'pify'
import {isDev} from './utils'
import config from './config'

const app = new Koa()

// use koa to serve static files in dev mode
if (isDev) {
  app.use(convert(logger()))
}

// build github client
const client = github.client({
  id: config.github.id,
  secret: config.github.secret
})

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
    if (isDev) {
      ctx.redirect(`http://localhost:3888/login/success/${token}`)
    } else {
      ctx.redirect(`http://vist.egoistian.com/login/success/${token}`)
    }
  } catch (e) {
    ctx.body = e.message
  }
})

router.get('*', async ctx => {
  ctx.body = 'vist api v1'
})

app.use(router.routes())
app.use(body())

app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`)
})
