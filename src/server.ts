import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Router } from './router'

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  Router(request, response)
}); 

export const HttpServer = (port: number): void => {
   server.listen(port, (...args) => {
    if (args.length) {
      console.log(args);
    } else {
      console.log(`Server listening on port ${port}`);
    }
  }) 
}