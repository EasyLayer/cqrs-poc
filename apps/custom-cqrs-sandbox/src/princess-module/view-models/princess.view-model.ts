import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('princess_viewmodel')
@Unique(['requestId', 'id'])
export class PrincessViewModel {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'uuid' })
    public uuid!: string;

    @Column({ type: 'varchar', default: null })
    public requestId!: string;

    @Column({ type: 'varchar', default: 'created' })
    public status!: string;
}