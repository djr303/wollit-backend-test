import requestBody from '../../src/operations/requestBody';
import { OperationResult } from '../../src/operations/types';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import MockReq from 'mock-req';
import { pipe } from 'fp-ts/lib/function';
import { IncomingMessage } from 'http';

describe('requestBody', () => {
  test('should return correct body as string from incomming request object', async () => {
    const request = new MockReq({
      method: 'POST',
      url: '/entity',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    request.write({
      name: 'test',
    });

    request.end();

    const requestBodyTask = requestBody(
      (request as unknown) as IncomingMessage,
    );
    const either = await pipe(
      requestBodyTask,
      TE.map((r: OperationResult<string>) => r.result),
    )();

    const result = await pipe(
      either,
      E.fold(
        (error) => console.error('Error making this request.', error),
        (result) => result,
      ),
    );

    expect(result).toBe('{"name":"test"}');
  });

  test('should throw error in Either result', async () => {
    const request = new MockReq({
      method: 'POST',
    });

    const requestBodyTask = requestBody(
      (request as unknown) as IncomingMessage,
    );
    
    // TODO: (david.j.roberts303@gmail.com) - Hacky: Having to use set timeout in order for `on.('error') to catch
    setTimeout(() => {
      request._fail(new Error('Test error'));
      request.write('test');
    })

    const either = await pipe(
      requestBodyTask,
      TE.map((r: OperationResult<string>) => r.result),
    )();

    await pipe(
      either,
      E.fold(
        (error) => expect(error.message).toBe('Error getting response body. Details Error: Test error'),
        () => { throw new Error('Failing test - Did not fail as expected') },
      )
    );

  });
});
