export class CreateHeroCommand {
    constructor(
      public readonly uuid: string,
      public readonly requestId: string,
    ) {}
}
  