import { Injectable, Inject } from '@nestjs/common';
import { EventBus, CustomEventBus } from '@cqrs/custom-cqrs-package';

@Injectable()
export class HeroEventFactoryService {
  constructor(
    @Inject(EventBus)
    private readonly eventBus: CustomEventBus
  ) {}

//   public async createDragon({ heroUuid, requestId }): Promise<void> {
//     await this.eventBus.publish(new DragonCreatedFailEvent(heroUuid, requestId));
//   }
}
