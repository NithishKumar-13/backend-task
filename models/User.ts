import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../utils/database'

interface UserAttributes {
    id: number,
    name: string,
    age: number,
    email: string
}

interface UserCreationAtrributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAtrributes>,
          UserAttributes {
              createdAt?: Date,
              updatedAt? :Date
          }

const User = sequelize.define<UserInstance>(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    , {
        tableName: "Users",
    }
)

export default User