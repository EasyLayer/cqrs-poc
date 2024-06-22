export class UpdateHeroCommand {
    constructor(
      public readonly uuid: string,
      public readonly requestId: string
    ) {}
}
  