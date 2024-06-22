import { IQueryHandler, QueryHandler } from '@cqrs/native-cqrs-package';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroesQuery } from '../impl';

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {
  constructor(private readonly repository: HeroRepository) {}

  async execute(query: GetHeroesQuery) {
    console.log('GetHeroesHandler execute()\n');
    return this.repository.findAll();
  }
}
