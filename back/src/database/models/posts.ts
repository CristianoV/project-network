import { INTEGER, STRING, TEXT, Model, DATE } from 'sequelize';
import user from './user';
import Comment from './comment';
import Like from './likes';
import db from '.';

class Post extends Model {
  public id: number;
  public text: string;
  public image: string;
  public user_id: number;
  public created_at: Date;
  public updated_at: Date;
}

Post.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: TEXT,
      allowNull: false,
    },
    image: {
      type: STRING,
      allowNull: true,
    },
    user_id: {
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
    modelName: 'Post',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  }
);

Post.belongsTo(user, { foreignKey: 'user_id', as: 'user' });
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });
Post.hasMany(Like, { foreignKey: 'post_id', as: 'likes' });

export default Post;
