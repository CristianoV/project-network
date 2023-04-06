import { INTEGER, STRING, TEXT, Model } from "sequelize";
import db from '.';

class User extends Model {
  public id: number;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public bio: string;
  public profile_picture: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    firstName: {
      type: STRING,
      allowNull: false,
    },
    lastName: {
      type: STRING,
      allowNull: false,
    },
    bio: {
      type: TEXT,
      allowNull: true,
    },
    profile_picture: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    timestamps: false,
  }
);

export default User;