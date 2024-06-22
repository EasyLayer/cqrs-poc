import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity('dragon_viewmodel')
@Unique(['requestId', 'id'])
export class DragonViewModel {
  @PrimaryColumn({ type: 'uuid' })
  public id!: string;

  @Column({ type: 'varchar', default: null })
  public requestId!: string;

  @Column({ type: 'int', default: 500 })
  public hitPoints!: number;

  @Column({ type: 'boolean', default: true })
  public isAlive!: boolean;

  @Column({ type: 'varchar', default: 'created' })
  public status!: string;
}