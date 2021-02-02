import { Handler } from "./types";
import requestBody from '../operations/requestBody';
import jsonParse from '../operations/jsonParse';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { OperationResult } from '../../src/operations/types';
import store from '../store';

const create: Handler = async (request, response) => {

  await pipe(
    requestBody(request),
    TE.map((r: OperationResult<string>) => r.result),
    TE.chain((body) => jsonParse(body)),
    TE.map((json: OperationResult<{ name: string }>) => {
      store.create({ name: json.result.name })
      response.writeHead(200);
      response.end();
    })
  )()
}

export default create;