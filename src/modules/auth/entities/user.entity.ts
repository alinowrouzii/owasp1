import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secret: string;
}
