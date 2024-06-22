import PQueue from 'p-queue';
import { Subject } from 'rxjs';
import { Injectable, Inject } from '@nestjs/common';
import { IEvent, IMessageSource, EventBus, CustomEventBus } from '@cqrs/custom-cqrs-package';
import { NewPublisher } from './new-publisher';

@Injectable()
export class NewSubscriber implements IMessageSource {
  private bridge!: Subject<IEvent>;
  private queueSingleConcurrency = new PQueue({ concurrency: 1 });

  constructor(
    private readonly publisher: NewPublisher,
    @Inject(EventBus)
    private readonly eventBus: CustomEventBus
  ) {
    this.initialize();
    this.bridgeEventsTo();
  }

  private initialize(): void { 
    this.publisher.events$.subscribe(event => {
      if (this.bridge) {
        this.queueSingleConcurrency.add(async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
          this.bridge.next(event);
        }).catch(error => console.error(error));
      }
    });
  }

  bridgeEventsTo(): void {
    this.bridge = this.eventBus.subject$;
  }
}
