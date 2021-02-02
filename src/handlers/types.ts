import { ServerResponse, IncomingMessage } from 'http';
export type Handler = (requuest: IncomingMessage, response: ServerResponse) => void