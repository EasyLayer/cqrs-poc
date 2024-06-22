import { v4 as uuidv4 } from 'uuid'; 
import { Injectable } from '@nestjs/common';
import { Observable, of, mergeMap, defer, map } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { ICommand, ofType, ChoreographySaga, executeWithOffset, execute } from '@cqrs/custom-cqrs-package';
import { DragonCreatedEvent } from '../../dragon-module/events/impl/dragon-created.event';
import { DragonDeletedEvent } from '../../dragon-module/events/impl/dragon-deleted.event';
import { PrincessCreatedEvent } from '../../princess-module/events/impl/princess-created.event';
import { PrincessDeletedEvent } from '../../princess-module/events/impl/princess-deleted.event';
import { PrincessCreatedFailEvent } from '../../princess-module/events/impl/princess-created-fail.event';
import { PrincessDeletedFailEvent } from '../../princess-module/events/impl/princess-deleted-fail.event';
import { DragonCreatedFailEvent } from '../../dragon-module/events/impl/dragon-created-fail.event';
import { DragonDeletedFailEvent } from '../../dragon-module/events/impl/dragon-deleted-fail.event';
import { HeroesCommandFactoryService, HeroEventFactoryService } from '../factories';
import { HeroCreatedEvent } from '../events/impl/hero-created.event';

@Injectable()
export class HeroesSaga {
    constructor(
        private readonly commandFactoryService: HeroesCommandFactoryService,
        private readonly eventFactoryService: HeroEventFactoryService
    ) {}

    // @ChoreographySaga()
    // onCreatedFailureEvent(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(
    //             PrincessCreatedFailEvent,
    //             DragonCreatedFailEvent,
    //             PrincessDeletedFailEvent,
    //             DragonDeletedFailEvent
    //         ),
    //         execute(
    //             event => this.commandFactoryService.deleteHero({ uuid: event.heroId, requestId: uuidv4() }), 
    //         ),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }

    // @ChoreographySaga()
    // onCreatedSuccessEvent(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(DragonCreatedEvent, PrincessCreatedEvent), // shared event
    //         execute(
    //             event => this.commandFactoryService.updateHero({ uuid: event.heroId, requestId: uuidv4() }),
    //         ),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }

    // @ChoreographySaga()
    // createHero(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(
    //             DragonCreatedEvent,
    //             PrincessCreatedEvent
    //         ),
    //         execute({
    //             event: DragonCreatedEvent,
    //             command: (data: DragonCreatedEvent) => this.commandFactoryService.createDragon({ heroUuid: data.id, requestId: uuidv4() }), 
    //         }),
    //         execute({
    //             event: DragonCreatedEvent,
    //             command: (data: DragonCreatedEvent) => this.commandFactoryService.createDragon({ heroUuid: data.id, requestId: uuidv4() }), 
    //         }),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }

    // createHeroFail(events$: Observable<any>): Observable<ICommand> {
    //     return events$.pipe(
    //         ofType(
    //             DragonCreatedRollbackEvent,
    //             PrincessCreatedRollbackEvent,
    //         ),
    //         execute({
    //             event: DragonCreatedRollbackEvent
    //             event => this.modelFactoryService.heroCreateRollback({ uuid: event.heroId, requestId: uuidv4() }), 
    //         }),
    //         execute({
    //             event: PrincessCreatedRollbackEvent
    //             event => this.modelFactoryService.dragonCreateRollback({ uuid: event.heroId, requestId: uuidv4() }), 
    //         }),
    //         catchError(error => {
    //             console.error(`Error handling transaction for event: ${error}`);
    //             return of();
    //         })
    //     );
    // }
}
