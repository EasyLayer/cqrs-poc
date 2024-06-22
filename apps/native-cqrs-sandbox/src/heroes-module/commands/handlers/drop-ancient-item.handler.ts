import { CommandHandler, ICommandHandler, EventPublisher } from '@cqrs/native-cqrs-package';
import { HeroRepository } from '../../repository/hero.repository';
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command';

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
  implements ICommandHandler<DropAncientItemCommand> {
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DropAncientItemCommand) {
    console.log('DropAncientItemHandler execute()');

    const { heroId, itemId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );

    hero.addItem(itemId);
    
    console.log('DropAncientItemHandler before commit()');
    hero.commit();
    console.log('DropAncientItemHandler after commit()');
  }
}
