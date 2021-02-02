import { IncomingMessage } from "http"

export const getIdFromPathName = (pathname: string): string => pathname.split('/')[1]
export const getPathName = (request: IncomingMessage): string => new URL(request.url, `http://${request.headers.host}`).pathname
