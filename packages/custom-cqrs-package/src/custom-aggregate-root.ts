import { Type } from '@nestjs/common';
import { IEvent, IEventHandler } from '@nestjs/cqrs';

const INTERNAL_EVENTS = Symbol();
const IS_AUTO_COMMIT_ENABLED = Symbol();

export abstract class CustomAggregateRoot<EventBase extends IEvent = IEvent> {
  public [IS_AUTO_COMMIT_ENABLED] = false;
  private readonly [INTERNAL_EVENTS]: EventBase[] = [];
  protected _version: number = 0;
  // public id: string;

  set autoCommit(value: boolean) {
    this[IS_AUTO_COMMIT_ENABLED] = value;
  }

  get autoCommit(): boolean {
    return this[IS_AUTO_COMMIT_ENABLED];
  }

  get version(): number {
    return this._version;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async publish<T extends EventBase = EventBase>(event: T): Promise<void> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async publishAll<T extends EventBase = EventBase>(event: T[]): Promise<void> {}

  async commit(): Promise<void> {
    const events = this.getUncommittedEvents();
    await this.publishAll(events);
    this.uncommit();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loadFromHistory(history: EventBase[]): Promise<void> {
    for (const event of history) {
      await this.apply(event, true);
    }
  }

  async apply<T extends EventBase = EventBase>(
    event: T,
    optionsOrIsFromHistory?: boolean | {
      fromHistory?: boolean;
      skipHandler?: boolean;
    }
  ): Promise<void> {
    let isFromHistory = false;
    let skipHandler = false;
  
    if (typeof optionsOrIsFromHistory === 'boolean') {
      isFromHistory = optionsOrIsFromHistory;
    } else if (typeof optionsOrIsFromHistory === 'object') {
      isFromHistory = optionsOrIsFromHistory.fromHistory ?? false;
      skipHandler = optionsOrIsFromHistory.skipHandler ?? false;
    }
  
    if (!isFromHistory && !this.autoCommit) {
      // Because of this we had to rewrite the entire aggregate class
      this[INTERNAL_EVENTS].push(event);
    }
  
    if (!skipHandler) {
      const handler = this.getEventHandler(event);
      if (handler) {
        await handler.call(this, event);
      }
    }
  
    if (this.autoCommit) {
      // When autoCommit is set to true, 
      // it means that any event applied to the aggregate should be published immediately. 
      // This is useful in scenarios where you want changes to an aggregate 
      // to immediately cause events to be published, without having to manually call commit.
      await this.publish(event);
    }

    // increment version for each event
    this._version++;
  }

  uncommit() {
    this[INTERNAL_EVENTS].length = 0;
  }

  getUncommittedEvents(): EventBase[] {
    return this[INTERNAL_EVENTS];
  }

  protected getEventHandler<T extends EventBase = EventBase>(
    event: T,
  ): Type<IEventHandler> | undefined {
    const handler = `on${this.getEventName(event)}`;
    return this[handler];
  }

  protected getEventName(event: any): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }
}
