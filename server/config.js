import {isDev} from './utils'

function prefix(str) {
  return isDev
    ? `DEV_${str}`
    : `PROD_${str}`
}

export default {
  port: process.env.NODE_PORT || 3000,
  github: {
    id: process.env[prefix('GITHUB_ID')],
    secret: process.env[prefix('GITHUB_SECRET')]
  }
}
