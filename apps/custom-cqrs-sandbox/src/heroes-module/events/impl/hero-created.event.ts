export class HeroCreatedEvent {
    constructor(
      public readonly id: string,
      public readonly requestId: string,
    ) {}
  }
  