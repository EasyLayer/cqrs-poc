export class PrincessCreatedFailEvent {
    constructor(
      public readonly heroId: string,
      public readonly requestId: string
    ) {}
  }
  