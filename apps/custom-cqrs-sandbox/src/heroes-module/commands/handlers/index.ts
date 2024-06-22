import { CreateHeroCommandHandler } from './create-hero.handler';
import { UpdateHeroCommandHandler } from './update-hero-status.handler';
import { DeleteHeroCommandHandler } from './delete-hero.handler.ts';

export const CommandHandlers = [
    CreateHeroCommandHandler,
    UpdateHeroCommandHandler,
    DeleteHeroCommandHandler
];
