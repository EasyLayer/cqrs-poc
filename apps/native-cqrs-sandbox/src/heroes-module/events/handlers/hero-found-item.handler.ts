import { EventsHandler, IEventHandler } from '@cqrs/native-cqrs-package';
import { HeroFoundItemEvent } from '../impl/hero-found-item.event';

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {
  handle(event: HeroFoundItemEvent) {
    console.log('HeroFoundItemHandler handle()\n');
  }
}
