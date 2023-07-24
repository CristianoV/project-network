import { INTEGER, STRING, TEXT, Model, DATE } from 'sequelize';
import User from './user';
import db from '.';

class Message extends Model {
  public id: number;
  public from: number;
  public to: number;
  public message: string;
  public image: string;
  public created_at: Date;
  public updated_at: Date;
}

Message.init(
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
    image: {
      type: STRING,
      allowNull: true,
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
    modelName: 'Message',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

Message.belongsTo(User, { foreignKey: 'from', as: 'fromUser' });
Message.belongsTo(User, { foreignKey: 'to', as: 'toUser' });

export default Message;
