import { AggregateRoot } from '@cqrs/native-cqrs-package';
import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';
import { HeroKickedDragonEvent } from '../events/impl/hero-kicked-dragon.event';

export class Hero extends AggregateRoot {
  constructor(private id: string) {
    super();
  }

  killEnemy(enemyId: string) {
    // logic
    console.log('Hero killEnemy()\n');
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  }

  damage(damage: number) {
    // logic
    console.log('Hero damage()\n');
    this.apply(new HeroKickedDragonEvent(this.id, damage));
  }

  addItem(itemId: string) {
    // logic
    console.log('Hero addItem()\n');
    this.apply(new HeroFoundItemEvent(this.id, itemId));
  }
}
