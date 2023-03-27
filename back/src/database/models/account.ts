import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Account extends Model {
  public id: number;
  public firstName: string;
  public lastName: string;
}

Account.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Accounts',
    timestamps: false,
  }
);

export default Account;
