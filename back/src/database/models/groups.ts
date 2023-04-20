import { INTEGER, STRING, TEXT, Model } from 'sequelize';
import user from './user';
import db from '.';

class Groups extends Model {
  public id: number;
  public profile_picture: string;
  public name: string;
  public description: string;
  public owner_id: number;
  public languages: string;
  public category: string;
  public type: string;
  public country: string;
}

Groups.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    profile_picture: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: TEXT,
      allowNull: false,
    },
    languages: {
      type: STRING,
      allowNull: false,
    },
    category: {
      type: STRING,
      allowNull: false,
    },
    type: {
      type: STRING,
      allowNull: false,
    },
    country: {
      type: STRING,
      allowNull: false,
    },
    owner_id: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Groups',
    timestamps: false,
  }
);

Groups.belongsTo(user, { as: 'user', foreignKey: 'owner_id' });

export default Groups;
