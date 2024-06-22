import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity('hero_viewmodel')
@Unique(['requestId', 'id'])
export class HeroViewModel {
    @PrimaryColumn({ type: 'uuid' })
    public id!: string;

    @Column({ type: 'varchar', default: null })
    public requestId!: string;

    @Column({ type: 'uuid' })
    public dragonUuid!: string;

    @Column({ type: 'uuid' })
    public princessUuid!: string;

    @Column({ type: 'int', default: 0 })
    public skill!: number;

    @Column({ type: 'int', default: 0 })
    public totalKills!: number;

    @Column({ type: 'int', default: 0 })
    public totalDamage!: number;

    @Column({ type: 'varchar', default: 'creating' })
    public status!: string;
}