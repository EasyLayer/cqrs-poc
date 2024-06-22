export class CreatePrincessCommand {
    constructor(
      public readonly uuid: string,
      public readonly heroUuid: string,
      public readonly requestId: string,
    ) {}
}
  