import * as TE from 'fp-ts/lib/TaskEither';
import { OperationResult } from './types'
import { IncomingMessage } from 'http';

const requestBody = (request: IncomingMessage): TE.TaskEither<Error, OperationResult<string>> => {
  return TE.tryCatch<Error, OperationResult<string>>(
    () => {
        return new Promise((resolve, reject) => {
          let data = '';

          request.on('data', chunk => {
            data += chunk ? chunk : ''
          })

          request.on('end', () => {
            resolve({ result: data })
          })

          request.on('error', (e: Error) => {
            reject(e)
          })
        })
      },
    (reason: unknown) => new Error(`Error getting response body. Details ${reason.toString()}`)
  )
}

export default requestBody;