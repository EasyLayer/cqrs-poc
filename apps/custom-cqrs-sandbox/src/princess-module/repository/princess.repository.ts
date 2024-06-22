import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrincessViewModel } from '../view-models/princess.view-model';

@Injectable()
export class PrincessRepository {
  constructor(
    @InjectRepository(PrincessViewModel, 'read-db')
    private readDb: Repository<PrincessViewModel>
  ) {}

  async create(uuid: string): Promise<PrincessViewModel> {
    return await this.readDb.save({ uuid });
  }

  async update(princessViewModel: PrincessViewModel): Promise<PrincessViewModel> {
    return await this.readDb.save(princessViewModel);
  }

  async findOneById(uuid: string): Promise<PrincessViewModel> {
    return await this.readDb.findOneByOrFail({ uuid });
  }

  async findAll(): Promise<PrincessViewModel[]> {
    const [heroes, total] = await this.readDb.findAndCount();
    return heroes;
  }
}
