import { INTEGER, Model } from 'sequelize';
import user from './user';
import group from './groups';
import db from '.';

class Partners extends Model {
  public id: number;
  public user_id_1: number;
  public user_id_2: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Partners.init(
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
    group_id: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Partners',
    timestamps: false,
  }
);

Partners.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
Partners.belongsTo(group, { as: 'group', foreignKey: 'group_id' });

export default Partners;
