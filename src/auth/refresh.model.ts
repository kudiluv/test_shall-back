import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'refreshes', createdAt: false, updatedAt: false })
export class Refresh extends Model<Refresh> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;
}
