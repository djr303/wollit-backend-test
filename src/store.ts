import guid from 'guid';

export type Entity = {
  id: string
  name: string
}

export type Event = {
  type: EventType,
  entity: Entity
}

export enum EventType {
  Created = 'Created',
  Updated = 'Updated',
  Deleted = 'Deleted'
}

export type EventHandler = (e: Event) => void

let store: Store;

class Store {
  
  entities: Entity[] = []
  eventHandlers: EventHandler[] = []

  private generateId(){
    return guid.raw()
  }

  subscribe(eventHandler: EventHandler ){
    this.eventHandlers.push(eventHandler)
  }

  emit(event: Event){
    this.eventHandlers.forEach(e => e(event))
  }

  create(entity: Pick<Entity, "name">) {
    const id = this.generateId()
    this.entities.push({ id, ...entity });
    this.emit({ type: EventType.Created, entity: { name: entity.name, id } })
  }

  update(entity: Entity) {
    const entityIdx = this.entities.findIndex((e => e.id === entity.id));
    this.entities[entityIdx] = { ...entity }
    this.emit({ type: EventType.Updated, entity: { name: entity.name, id: entity.id } })
  }

  delete(id: string) {
    const entityIdx = this.entities.findIndex((e => e.id === id));
    const entity = this.entities.splice(entityIdx, 1)[0];
    this.emit({ type: EventType.Deleted, entity: { name: entity.name, id: entity.id } })
  }
}

export default store ? store : new Store();