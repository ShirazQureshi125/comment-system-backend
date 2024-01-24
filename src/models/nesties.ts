/* import { Table, Model, Column, DataType } from "sequelize-typescript";
interface NestAttributes {
  nestedReplyd?: number;
  content: string;
  replyId: string;
}
@Table({
  //   timestamps: false,
  tableName: "nesties",
})
export class Nest extends Model<NestAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  nestedReplyd!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.UUID,
   
    allowNull: false,
  })
  replyId!: string;
}
 */

import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Reply } from "./replies";
interface NestAttributes {
  nestedReplyd?: number;
  content: string;
  replyId: string;
}
@Table({
  tableName: "nesties",
})
export class Nest extends Model <NestAttributes>{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  nestedReplyd!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  replyId!: string;

  @BelongsTo(() => Reply, { foreignKey: 'replyId', as: 'reply' })
  reply!: Reply;
}
