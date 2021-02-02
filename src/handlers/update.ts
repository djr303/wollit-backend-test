import { Handler } from "./types";
import requestBody from '../operations/requestBody';
import jsonParse from '../operations/jsonParse';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import { OperationResult } from '../operations/types';
import store from '../store';
import { getIdFromPathName, getPathName } from '../helpers'

const update: Handler = async (request, response) => {
  
  const id = getIdFromPathName(getPathName(request))

  await pipe(
    requestBody(request),
    TE.map((r: OperationResult<string>) => r.result),
    TE.chain((body) => jsonParse(body)),
    TE.map((json: OperationResult<{ name: string }>) => {
      store.update({ id, name: json.result.name })
      response.end()
    })
  )()
}

export default update;