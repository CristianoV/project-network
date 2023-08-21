import { INTEGER, STRING, TEXT, Model, DATE } from 'sequelize';
import user from './user';
import db from '.';

class Testimony extends Model {
  public id: number;
  public message: string;
  public from: number;
  public to: number;
  public status: string;
}

Testimony.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    from: {
      type: INTEGER,
      allowNull: false,
    },
    to: {
      type: INTEGER,
      allowNull: false,
    },
    message: {
      type: TEXT,
      allowNull: false,
    },
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    created_at: {
      type: DATE,
      allowNull: false,
    },
    updated_at: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Testimony',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

Testimony.belongsTo(user, { foreignKey: 'from', as: 'fromUser' });
Testimony.belongsTo(user, { foreignKey: 'to', as: 'toUser' });

export default Testimony;
