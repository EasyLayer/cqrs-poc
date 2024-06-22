import { Injectable, Inject } from '@nestjs/common';
import { EventBus, CustomEventBus } from '@cqrs/custom-cqrs-package';
import { DragonCreatedFailEvent } from '../events/impl/dragon-created-fail.event';
import { DragonDeletedFailEvent } from '../events/impl/dragon-deleted-fail.event';

@Injectable()
export class DragonEventFactoryService {
  constructor(
    @Inject(EventBus)
    private readonly eventBus: CustomEventBus
  ) {}

  public async publishDragonCreatedFailEvent({ heroUuid, requestId }): Promise<void> {
    await this.eventBus.publish(new DragonCreatedFailEvent(heroUuid, requestId));
  }

  public async publishDragonDeletedFailEvent({ uuid, heroUuid, requestId }): Promise<void> {
    await this.eventBus.publish(new DragonDeletedFailEvent(heroUuid, uuid, requestId));
  }
}
