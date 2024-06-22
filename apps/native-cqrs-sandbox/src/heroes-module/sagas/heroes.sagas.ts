import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@cqrs/native-cqrs-package';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DropAncientItemCommand } from '../commands/impl/drop-ancient-item.command';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';

const itemId = '0';

@Injectable()
export class HeroesGameSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(HeroKilledDragonEvent),
        delay(1000),
        map(event => {
          console.log('HeroesGameSagas dragonKilled()\n');
          return new DropAncientItemCommand(event.heroId, itemId);
        }),
      );
  }
}
