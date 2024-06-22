import { v4 as uuidv4 } from 'uuid'; 
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ICommand, ofType, ChoreographySaga, executeWithOffset } from '@cqrs/custom-cqrs-package';
import { HeroCreatedEvent } from '../../heroes-module/events/impl/hero-created.event';
import { HeroDeletedEvent } from '../../heroes-module/events/impl/hero-deleted.event';
import { PrincessCommandFactoryService, PrincessEventFactoryService,  } from '../factories';

@Injectable()
export class CreatePrincessSaga {
    constructor(
        private readonly commandFactoryService: PrincessCommandFactoryService,
        private readonly eventFactoryService: PrincessEventFactoryService
    ) {}

    // @ChoreographySaga()
    // onHeroCreatedEvent(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(HeroCreatedEvent), // shared event
    //         executeWithRollback(
    //             event => this.commandFactoryService.createPrincess({ heroUuid: event.id, requestId: uuidv4() }), 
    //             event => this.eventFactoryService.publishPrincessCreatedFailEvent({ heroUuid: event.id, requestId: uuidv4() })
    //         ),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }

    // @ChoreographySaga()
    // onHeroDeletedEvent(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(HeroDeletedEvent), // shared event
    //         executeWithRollback(
    //             event => this.commandFactoryService.deletePrincess({ heroUuid: event.id, uuid: event.princessId, requestId: uuidv4() }), 
    //             event => this.eventFactoryService.publishPrincessDeletedFailEvent({ heroUuid: event.id, uuid: event.princessId, requestId: uuidv4()  })
    //         ),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }
}
