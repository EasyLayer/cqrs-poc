import { CommandHandler, ICommandHandler, EventPublisher } from '@cqrs/native-cqrs-package';
import { HeroRepository } from '../../repository/hero.repository';
import { KillDragonCommand } from '../impl/kill-dragon.command';

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: KillDragonCommand) {
    console.log('KillDragonHandlerHandler execute()\n');

    const { heroId, dragonId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );

    hero.damage(100);
    hero.damage(300);
    hero.killEnemy(dragonId);

    console.log('KillDragonHandlerHandler before commit()');
    hero.commit();
    console.log('KillDragonHandlerHandler after commit()');
  }
}
