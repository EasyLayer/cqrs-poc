export class HeroStatusUpdatedEvent {
    constructor(
      public readonly id: string,
      public readonly status: string,
      public readonly requestId: string
    ) {}
  }
  