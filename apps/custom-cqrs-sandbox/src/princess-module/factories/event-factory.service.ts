import { Injectable, Inject } from '@nestjs/common';
import { EventBus, CustomEventBus } from '@cqrs/custom-cqrs-package';
import { PrincessCreatedFailEvent } from '../events/impl/princess-created-fail.event';
import { PrincessDeletedFailEvent } from '../events/impl/princess-deleted-fail.event';

@Injectable()
export class PrincessEventFactoryService {
  constructor(
    @Inject(EventBus)
    private readonly eventBus: CustomEventBus
  ) {}

  public async publishPrincessCreatedFailEvent({ heroUuid, requestId }): Promise<void> {
    await this.eventBus.publish(new PrincessCreatedFailEvent(heroUuid, requestId));
  }

  public async publishPrincessDeletedFailEvent({ uuid, heroUuid, requestId }): Promise<void> {
    await this.eventBus.publish(new PrincessDeletedFailEvent(heroUuid, uuid, requestId));
  }
}
