import { EventsHandler , IEventHandler} from '@cqrs/custom-cqrs-package';
import { HeroCreatedEvent } from '../impl/hero-created.event';
import { HeroRepository } from '../../repository/hero.repository';

@EventsHandler(HeroCreatedEvent)
export class HeroCreatedEventHandler
  implements IEventHandler<HeroCreatedEvent> {
    constructor(
      private readonly repository: HeroRepository
    ) {}
  async handle(event: HeroCreatedEvent) {
    // const { id } = event;
    // return await this.repository.create(id);
  }
}
