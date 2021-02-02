import * as TE from 'fp-ts/lib/TaskEither';
import { OperationResult } from './types'

const jsonParse = (body: string): TE.TaskEither<Error, OperationResult<Array<unknown> | unknown>> => {
  return TE.tryCatch<Error, OperationResult<string>>(
    () => {
        return new Promise((resolve, reject) => {
          try {
            resolve({ result: JSON.parse(body)})
          } catch (e) {
            reject(e)
          }
        })
      },
    (reason: unknown) => new Error(`Error getting response body. Details ${reason.toString()}`)
  )
}

export default jsonParse;