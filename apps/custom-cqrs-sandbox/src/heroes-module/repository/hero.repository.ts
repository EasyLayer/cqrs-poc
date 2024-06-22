import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroViewModel } from '../view-models/hero.view-model';

@Injectable()
export class HeroRepository {
  constructor(
    @InjectRepository(HeroViewModel, 'read-db')
    private readDb: Repository<HeroViewModel>
  ) {}

  async create(uuid: string): Promise<HeroViewModel> {
    return await this.readDb.save({ id: uuid });
  }

  async update(heroViewModel: HeroViewModel): Promise<HeroViewModel> {
    return await this.readDb.save(heroViewModel);
  }

  async findOneById(uuid: string): Promise<HeroViewModel> {
    return await this.readDb.findOneByOrFail({ id: uuid });
  }

  async findAll(): Promise<HeroViewModel[]> {
    const [heroes, total] = await this.readDb.findAndCount();
    return heroes;
  }
}
