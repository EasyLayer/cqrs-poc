export class PrincessDeletedFailEvent {
    constructor(
      public readonly id: string,
      public readonly heroId: string,
      public readonly requestId: string
    ) {}
  }
  