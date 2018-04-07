import bodyParser from 'body-parser'
import bunyan from 'bunyan'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import expressLog from 'express-bunyan-logger'

import configureReliableMailer from './initializers/configureReliableMailer'
import setupEmailRoutes from './routes/emailRoutes'

dotenv.config()
const app = express()
const log = bunyan.createLogger({name: 'server'})
configureReliableMailer()

app.use(cors())
app.use(expressLog())
app.use(expressLog.errorLogger())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

setupEmailRoutes(app)

const PORT = process.env.PORT || 3030
log.info(`Started listing on port ${PORT}`)
app.listen(PORT)
