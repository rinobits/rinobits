import express, { Application } from 'express'
const app: Application = express()
const morgan = require('morgan')
const cors = require('cors')
// imports & consts
const routes = require('./app/router')
const { config } = require('./config')
const notFoundHandler = require('./middlewares/notFoundHandler')
const { logError, wrapError, errorHandler } = require('./middlewares/errorsHandlers')

// cors
if (config.dev) {
  app.use(cors())
} else {
  const whitelist = config.cors.split(';')
  const corsOptions = {
    origin: (origin: any, callback: any) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.use(cors(corsOptions))
}

// settings
app.set('PORT', process.env.PORT || 3000)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
/* app.use(morgan('dev'))
 */
// routes
routes(app)

// catch errors
/* app.use(notFoundHandler)
app.use(logError)
app.use(wrapError)
app.use(errorHandler) */


app.get('/', (req, res) => res.send('Express + TypeScript Server'))

app.listen(app.get('PORT'), () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${app.get('PORT')}`)
})
