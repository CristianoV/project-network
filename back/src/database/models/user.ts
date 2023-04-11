import { INTEGER, STRING, TEXT, Model, DATE } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public bio: string;
  public profile_picture: string;
  public birthday: Date;
  public relationship: string;
  public country: string;
  public phrase: string;
  public sex: string;
  public cep: string;
  public state: string;
  public language: string;
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
    birthday: {
      type: DATE,
      allowNull: true,
    },
    relationship: {
      type: STRING,
      allowNull: true,
    },
    country: {
      type: STRING,
      allowNull: true,
    },
    phrase: {
      type: STRING,
      allowNull: true,
    },
    sex: {
      type: STRING,
      allowNull: true,
    },
    cep: {
      type: STRING,
      allowNull: true,
    },
    state: {
      type: STRING,
      allowNull: true,
    },
    language: {
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
