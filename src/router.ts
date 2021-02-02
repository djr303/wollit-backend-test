import { ServerResponse, IncomingMessage } from 'http';
import routes, { Route, Methods } from './routes';
import { getPathName } from './helpers';

export const routeMatches = (method: Methods, url: string, route: Route): boolean =>
    method === route.method && url === route.url

export const Router = (request: IncomingMessage,  response: ServerResponse): void => {

    const pathname = getPathName(request).split('/')[1]
    const method = request.method;
    const routeKeysLength = routes.length;

    for (let i = 0; i < routeKeysLength; i++){
        if (routeMatches(method as Methods, pathname, routes[i])) {
            routes[i].handler(request, response)
            break;
        }
    }
}