import { EventsHandler , IEventHandler} from '@cqrs/custom-cqrs-package';
import { PrincessCreatedEvent } from '../impl/princess-created.event';
import { PrincessRepository } from '../../repository/princess.repository';

@EventsHandler(PrincessCreatedEvent)
export class PrincessCreatedEventHandler
  implements IEventHandler<PrincessCreatedEvent> {
    constructor(
      private readonly repository: PrincessRepository
    ) {}
  async handle(event: PrincessCreatedEvent) {
    // const { id } = event;
    // return await this.repository.create(id);
  }
}
