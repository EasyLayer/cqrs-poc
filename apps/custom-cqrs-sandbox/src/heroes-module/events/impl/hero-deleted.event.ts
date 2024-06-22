export class HeroDeletedEvent {
    constructor(
      public readonly id: string,
      public readonly status: string,
      public readonly princessId: string,
      public readonly dragonId: string,
      public readonly requestId: string
    ) {}
}
  