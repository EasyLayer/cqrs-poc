import { EventsHandler, IEventHandler } from '@cqrs/native-cqrs-package';
import { HeroKickedDragonEvent } from '../impl/hero-kicked-dragon.event';

@EventsHandler(HeroKickedDragonEvent)
export class HeroKickedDragonHandler
  implements IEventHandler<HeroKickedDragonEvent> {
  async handle(event: HeroKickedDragonEvent) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('HeroKickedDragonHandler handle()\n');
  }
}
