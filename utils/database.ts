import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    'users', // DATABASE NAME
    'root', // USER
    '', {   // PASSWORD
        dialect: 'mysql',
        host: 'localhost'
    }
)

export default sequelize
