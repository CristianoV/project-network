import {  INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;
  public username: string;
  public password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default User;