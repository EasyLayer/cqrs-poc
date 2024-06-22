export class DragonCreatedFailEvent {
    constructor(
      public readonly heroId: string,
      public readonly requestId: string,
    ) {}
  }