import { AggregateRoot } from '@cqrs/custom-cqrs-package';
import { DragonCreatedEvent } from '../events/impl/dragon-created.event';
import { DragonDeletedEvent } from '../events/impl/dragon-deleted.event';

export class DragonModel extends AggregateRoot {
  public id!: string;
  public requestId!: string;
  public heroId!: string;
  public hitPoints: number = 500;
  public isAlive: boolean = true;
  public status!: string;

  async create(uuid: string, heroUuid: string, requestId: string) {
    await this.apply(new DragonCreatedEvent(uuid, heroUuid, requestId, 'created'));
  }

  async delete(uuid: string, heroUuid: string, requestId: string) {
    await this.apply(new DragonDeletedEvent(uuid, heroUuid, requestId, 'deleted'));
  }

  private onDragonDeletedEvent({ }: DragonDeletedEvent) {
    this.status = 'deleted';
  }

  private onDragonCreatedEvent({ id, heroId }: DragonCreatedEvent) {
    this.id = id;
    this.requestId = this.requestId;
    this.heroId = heroId;
    this.status = 'created';
  }
}
