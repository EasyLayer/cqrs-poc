export class CreateDragonCommand {
    constructor(
      public readonly uuid: string,
      public readonly heroUuid: string,
      public readonly requestId: string
    ) {}
}
  