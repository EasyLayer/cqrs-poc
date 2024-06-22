import { EventsHandler , IEventHandler} from '@cqrs/native-cqrs-package';
import { HeroKilledDragonEvent } from '../impl/hero-killed-dragon.event';
import { HeroRepository } from '../../repository/hero.repository';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
  implements IEventHandler<HeroKilledDragonEvent> {
    constructor(
      private readonly repository: HeroRepository
    ) {}
  async handle(event: HeroKilledDragonEvent) {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('HeroKilledDragonHandler handle()\n', this.repository.findAll());
  }
}
