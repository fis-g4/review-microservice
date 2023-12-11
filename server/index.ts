import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import users from './routes/users'
import reviews from './routes/reviews'
import './loadEnvironment'
import './db/conn'

const app: Express = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Review microservice')
})

const port = process.env.PORT ?? 8000

app.listen(port, () => {
    console.log(`Review microservice listening on port ${port}`)
})

app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)
