import { Injectable, Type } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { CqrsOptions } from '@nestjs/cqrs/dist/interfaces/cqrs-options.interface';
import { CHOREOGRAPHY_SAGA_METADATA } from './constants';

export interface IExtendedOptions extends CqrsOptions {
  choreographySagas?: Type<any>[];
}

@Injectable()
export class CustomExplorerService<EventBase extends IEvent = IEvent> extends ExplorerService<EventBase> {
  private customModulesContainer: ModulesContainer;

  constructor(modulesContainer: ModulesContainer) {
    super(modulesContainer);
    this.customModulesContainer = modulesContainer;
  }

  explore(): IExtendedOptions {
    const baseOptions = super.explore();

    const modules = [...this.customModulesContainer.values()];
    const choreographySagas = this.flatMap(modules, (instance) =>
      this.filterProvider(instance, CHOREOGRAPHY_SAGA_METADATA)
    );

    return { ...baseOptions, choreographySagas };
  }
}
