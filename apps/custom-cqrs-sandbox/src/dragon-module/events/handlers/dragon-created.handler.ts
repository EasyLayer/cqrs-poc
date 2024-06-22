import { EventsHandler , IEventHandler} from '@cqrs/custom-cqrs-package';
import { DragonCreatedEvent } from '../impl/dragon-created.event';
import { DragonRepository } from '../../repository/dragon.repository';

@EventsHandler(DragonCreatedEvent)
export class DragonCreatedEventHandler
  implements IEventHandler<DragonCreatedEvent> {
    constructor(
      private readonly repository: DragonRepository
    ) {}

  async handle(event: DragonCreatedEvent) {
    // const { id } = event;
    // return await this.repository.create(id);
  }
}
