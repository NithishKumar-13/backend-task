import express, { Request, Response, Application } from 'express'
const app: Application = express()
const PORT = process.env.PORT || 8080
import User from "./models/User";
import sequelize  from './utils/database'


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

sequelize.sync()

app.get('/', async(req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello from the server' })
})

// GET ALL USERS
app.get('/api/users', async(req: Request, res: Response) => {
    const users = await User.findAll()
    res.status(200).send(users)
})

// POST A NEW USER
app.post('/api/users', (req: Request, res: Response) => {
    const { name, age, email } = req.body
    User.create({
        name,
        age,
        email
    })
     .then(() => res.send('User data inserted successfully'))
     .catch((err: void) => console.log(err))
})

app.listen(PORT, ():void => {
    console.log(`Server listening to PORT ${PORT}...`)
})