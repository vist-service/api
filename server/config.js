import dotenv from 'dotenv'
import {isDev} from './utils'

dotenv.config()

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
