import { AggregateRoot } from '@cqrs/custom-cqrs-package';
import { PrincessCreatedEvent } from '../events/impl/princess-created.event';
import { PrincessDeletedEvent } from '../events/impl/princess-deleted.event';

export class PrincessModel extends AggregateRoot {
  public id!: string;
  public requestId!: string;
  public heroId!: string;
  public status!: string;

  async create(uuid: string, heroUuid: string, requestId: string) {
    await this.apply(new PrincessCreatedEvent(uuid, heroUuid, requestId, 'created'));
  }

  async delete(uuid: string, heroUuid: string, requestId: string) {
    await this.apply(new PrincessDeletedEvent(uuid, heroUuid, requestId, 'deleted'));
  }

  private onPrincessCreatedEvent({ id, heroId, requestId }: PrincessCreatedEvent) {
    this.id = id;
    this.heroId = heroId;
    this.requestId = requestId;
    this.status = 'created';
  }

  private onPrincessDeletedEvent({ }: PrincessCreatedEvent) {
    this.status = 'deleted';
  }
}
