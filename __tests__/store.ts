import store from '../src/store';

describe('Store', () => {

  beforeEach(() => {
    store.entities = []
  })

  test('should be able to create entity object and add to entities', () => {
    store.create({
      name: "test-value"
    })

    const entity = store.entities[0];

    expect(entity.name).toBe("test-value")
    expect(entity.id.length).toBeGreaterThan(0)
    expect(typeof entity.id).toBe('string')
  });

  test('should be able to update entities collection', () => {
    store.create({
      name: "test-value-01"
    })

    store.create({
      name: "test-value-02"
    })

    store.create({
      name: "test-value-03"
    })

    const entity01 = store.entities[1];

    store.update({
      id: entity01.id,
      name: "test-value-05"
    })

    const entity02 = store.entities[1]

    expect(entity02.name).toBe("test-value-05")
    expect(entity02.id).toBe(entity01.id)
  })

  test('should be able to delete entities collection', () => {
    store.create({
      name: "test-value-01"
    })

    store.create({
      name: "test-value-02"
    })

    store.create({
      name: "test-value-03"
    })

    const entity = store.entities[1];

    store.delete(entity.id)

    const entity02 = store.entities[0]
    const entity03 = store.entities[1]

    expect(store.entities.length).toBe(2)
    
    expect(entity02.id.length).toBeGreaterThan(0)
    expect(typeof entity02.id).toBe('string')
    expect(entity02.name).toBe('test-value-01')

    expect(entity03.id.length).toBeGreaterThan(0)
    expect(typeof entity03.id).toBe('string')
    expect(entity03.name).toBe('test-value-03')
  })
})