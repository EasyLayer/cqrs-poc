import 'reflect-metadata';
import { CHOREOGRAPHY_SAGA_METADATA } from '../constants';

export const ChoreographySaga = (): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    const properties =
      Reflect.getMetadata(CHOREOGRAPHY_SAGA_METADATA, target.constructor) || [];
    Reflect.defineMetadata(
      CHOREOGRAPHY_SAGA_METADATA,
      [...properties, propertyKey],
      target.constructor,
    );
  };
};
