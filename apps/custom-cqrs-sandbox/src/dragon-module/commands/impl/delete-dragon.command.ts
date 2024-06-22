export class DeleteDragonCommand {
    constructor(
      public readonly heroUuid: string,
      public readonly uuid: string,
      public readonly requestId: string,
    ) {}
}