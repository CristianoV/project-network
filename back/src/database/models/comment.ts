import { INTEGER, STRING, TEXT, Model, DATE } from 'sequelize';
import user from './user';
import Post from './posts';
import db from '.';

class Comment extends Model {
  public id: number;
  public content: string;
  public user_id: number;
  public post_id: number;
  public created_at: Date;
  public updated_at: Date;
}

Comment.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: TEXT,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    post_id: {
      type: INTEGER,
      allowNull: false,
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
    modelName: 'Comment',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

Comment.belongsTo(user, { foreignKey: 'user_id', as: 'user' });


export default Comment;
