import { INTEGER, STRING, TEXT, Model } from "sequelize";
import db from '.';

class Groups extends Model {
  public id: number;
  public profile_picture: string;
  public name: string;
  public description: string;
  public owner_id: number;
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

export default Groups;