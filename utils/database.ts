import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    '', // DATABASE NAME
    'root', // USER
    '', {   // PASSWORD
        dialect: 'mysql',
        host: 'localhost'
    }
)

export default sequelize
