import { INTEGER, STRING, TEXT, Model, DATE } from 'sequelize';
import user from './user';
import db from '.';

class Avaliation_status extends Model {
  public id: number;
  public avaliation: string;
  public user_id: number;
  public evaluator_id: number;
  public type_avaliation: string;
}

Avaliation_status.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    avaliation: {
      type: STRING,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
    },
    evaluator_id: {
      type: INTEGER,
      allowNull: false,
    },
    type_avaliation: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Avaliation_status',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    timestamps: false,
  }
);

Avaliation_status.belongsTo(user, { foreignKey: 'user_id', as: 'user' });
Avaliation_status.belongsTo(user, { foreignKey: 'evaluator_id', as: 'user_evaluator' });

export default Avaliation_status;
