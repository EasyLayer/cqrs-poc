export class DeleteHeroCommand {
    constructor(
      public readonly uuid: string,
      public readonly requestId: string
    ) {}
}
  