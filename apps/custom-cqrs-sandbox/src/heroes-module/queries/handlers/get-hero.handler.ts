import { IQueryHandler, QueryHandler } from '@cqrs/custom-cqrs-package';
import { HeroRepository } from '../../repository/hero.repository';
import { GetHeroQuery } from '../impl';

@QueryHandler(GetHeroQuery)
export class GetHeroHandler implements IQueryHandler<GetHeroQuery> {
  constructor(private readonly repository: HeroRepository) {}

  async execute(query: GetHeroQuery) {
    const { uuid } = query;
    return this.repository.findOneById(uuid);
  }
}
