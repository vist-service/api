import {isDev} from './utils'

if (isDev) {
  require('dotenv').config()
}

function prefix(str) {
  return isDev
    ? `DEV_${str}`
    : `PROD_${str}`
}

export default {
  port: 3789,
  github: {
    id: process.env[prefix('GITHUB_ID')],
    secret: process.env[prefix('GITHUB_SECRET')]
  }
}
