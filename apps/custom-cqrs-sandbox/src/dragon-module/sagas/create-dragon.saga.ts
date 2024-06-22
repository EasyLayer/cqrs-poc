import { v4 as uuidv4 } from 'uuid'; 
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ICommand, ofType, ChoreographySaga, executeWithOffset } from '@cqrs/custom-cqrs-package';
import { HeroCreatedEvent } from '../../heroes-module/events/impl/hero-created.event';
import { HeroDeletedEvent } from '../../heroes-module/events/impl/hero-deleted.event';
import { DragonCommandFactoryService, DragonEventFactoryService } from '../factories';

@Injectable()
export class CreateDragonSaga {
    constructor(
        private readonly commandFactoryService: DragonCommandFactoryService,
        private readonly eventFactoryService: DragonEventFactoryService
    ) {}

    // @ChoreographySaga()
    // onHeroCreatedEvent(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(HeroCreatedEvent), // shared event
    //         executeWithRollback(
    //             event => this.commandFactoryService.createDragon({ heroUuid: event.id, requestId: uuidv4() }),
    //             event => this.eventFactoryService.publishDragonCreatedFailEvent({ heroUuid: event.id, requestId: uuidv4() })
    //         ),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }

    @ChoreographySaga()
    onHeroDeletedEvent(events$: Observable<any>): Observable<ICommand> {
        return events$.pipe(
            ofType(HeroDeletedEvent), // shared event
            executeWithRollback(
                event => this.commandFactoryService.deleteDragon({ heroUuid: event.id, uuid: event.dragonId, requestId: uuidv4() }), 
                event => this.eventFactoryService.publishDragonDeletedFailEvent({ heroUuid: event.id, uuid: event.dragonId, requestId: uuidv4() })
            ),
            catchError(error => {
                console.error(`Error handling transaction for event: ${error}`);
                return of();
            })
        );
    }
}
