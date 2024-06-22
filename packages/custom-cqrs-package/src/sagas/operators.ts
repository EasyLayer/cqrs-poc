import { Observable, OperatorFunction, defer, of, from, concatMap } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { IEvent } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';

export interface RetryOptions {
  count?: number;
  delay?: number;
}

export interface ExecuteParams<T extends {}> {
  event: Type<IEvent>;
  command: (data: T) => Promise<any>;
}

export interface ExecuteWithOffsetParams<T extends {}> {
  event: Type<IEvent>;
  command: (data: T) => Promise<any>;
  offset: (data: T, error: any) => Promise<void>;
  retry: RetryOptions;
}

export function execute<T>({
  event,
  command,
}: ExecuteParams<T>): OperatorFunction<IEvent, IEvent> {
  return (source: Observable<IEvent>) => source.pipe(
    // concatMap - 
    concatMap(payload => {
      if (payload instanceof event) {
        // defer - 
        return defer(() => command(payload as T)).pipe(
          map(() => payload)
        );
      }

      // If the event does not match the expected type, simply skip it further without changes
      return of(payload);
    })
  );
}

export function executeWithOffset<T>({
  event,
  command,
  offset,
  retry: {
    count,
    delay
  }
}: ExecuteWithOffsetParams<T>): OperatorFunction<T, T> {
  return (source: Observable<T>) => source.pipe(
    // concatMap - 
    concatMap(payload => {
      if (payload instanceof event) {
        // defer - 
        return defer(() => command(payload as T)).pipe(
          catchError((error) => {
            // from - 
            return from(offset(payload, error)).pipe(
              retry({
                count: count ?? Infinity,
                delay: delay ?? 1000,
                resetOnSuccess: true
              }),
            );
          }),
          map(() => payload)
        )
      }

      // If the event does not match the expected type, simply skip it further without changes
      return of(payload);
    })
  );
}
