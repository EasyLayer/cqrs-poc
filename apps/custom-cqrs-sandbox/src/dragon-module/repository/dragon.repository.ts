import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DragonViewModel } from '../view-models/dragon.view-model';

@Injectable()
export class DragonRepository {
  constructor(
    @InjectRepository(DragonViewModel, 'read-db')
    private readDb: Repository<DragonViewModel>
  ) {}

  async create(uuid: string): Promise<DragonViewModel> {
    return await this.readDb.save({ id: uuid });
  }

  async update(dragonViewModel: DragonViewModel): Promise<DragonViewModel> {
    return await this.readDb.save(dragonViewModel);
  }

  async findOneById(uuid: string): Promise<DragonViewModel> {
    return await this.readDb.findOneByOrFail({ id: uuid });
  }

  async findAll(): Promise<DragonViewModel[]> {
    const [dragons, total] = await this.readDb.findAndCount();

    return dragons;
  }
}
