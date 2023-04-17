import { INTEGER, Model, STRING } from 'sequelize';
import user from './user';
import db from '.';

class Friends extends Model {
  public id: number;
  public user_id_1: number;
  public user_id_2: number;
  public status: string;
  user_2: any;
  user_1: any;
}

Friends.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id_1: {
      type: INTEGER,
      allowNull: false,
    },
    user_id_2: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Friendship',
    timestamps: false,
  }
);

Friends.belongsTo(user, { as: 'user_1', foreignKey: 'user_id_1' });
Friends.belongsTo(user, { as: 'user_2', foreignKey: 'user_id_2' });

export default Friends;
