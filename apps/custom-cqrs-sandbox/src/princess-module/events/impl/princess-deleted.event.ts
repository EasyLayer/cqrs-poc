export class PrincessDeletedEvent {
    constructor(
      public readonly id: string,
      public readonly heroId: string,
      public readonly requestId: string,
      public readonly status: string,
    ) {}
  }
  