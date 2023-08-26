import { INTEGER, STRING, Model, DATE } from 'sequelize';
import user from './user';
import post from './posts';
import db from '.';

class Like extends Model {
  public id: number;
  public user_id: number;
  public post_id: number;
  public status: string;
}

Like.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: 'like',
    },
  },
  {
    sequelize: db,
    tableName: 'Like',
    timestamps: false,
  }
);

Like.belongsTo(user, { foreignKey: 'user_id', as: 'user' });

export default Like;
