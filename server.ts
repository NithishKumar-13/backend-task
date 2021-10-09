import express, { Request, Response, Application } from 'express'
const app: Application = express()
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const PORT = process.env.PORT || 8080

import User from "./models/User";
import sequelize  from './utils/database'


sequelize.sync()

const schema = buildSchema(`
    type Query {
        message: String
        users: [User]
        addUser: String
    }

    type User {
        id: Int,
        name: String,
        age: Int,
        email: String
    }

    type Mutation {
        addUser(name: String!, age: Int!, email: String!): User
    }
`)

// GET ALL USERS FROM THE DB
const getUsers = async() => {
    const users = await User.findAll()
    return users
}

interface USER {
    id: number,
    name: string,
    age: number,
    email: string
}

// ADD NEW USER TO THE DB
const addUser = async(args: USER): Promise<void> => {
    await User.create({
        name: args.name,
        age: args.age,
        email: args.email
    })
}

const rootValue = {
    message: () => 'Hello world!',
    users: getUsers,
    addUser: addUser
}

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(PORT, ():void => {
    console.log(`Server listening to PORT ${PORT}...`)
})