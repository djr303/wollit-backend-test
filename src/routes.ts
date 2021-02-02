import { Handler } from './handlers/types'
import createHandler from './handlers/create'
import updateHandler from './handlers/update';
import deleteHandler from './handlers/delete';
import eventsHandler from './handlers/events'

export enum Methods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export type Route = {
    method: Methods,
    url: string,
    handler: Handler
}

export const create: Route = {
    method: Methods.POST,
    url: 'entity',
    handler: createHandler
}

export const update: Route = {
    method: Methods.PUT,
    url: 'entity',
    handler: updateHandler
}

export const _delete: Route = {
    method: Methods.DELETE,
    url: 'entity',
    handler: deleteHandler
}

export const events: Route = {
    method: Methods.GET,
    url: 'events',
    handler: eventsHandler
}

export default [
    create,
    update,
    _delete,
    events,
]