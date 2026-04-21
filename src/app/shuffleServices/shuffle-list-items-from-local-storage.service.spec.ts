import { ShuffleListItemsFromLocalStorageService } from './shuffle-list-items-from-local-storage.service';

describe('ShuffleListItemsFromLocalStorageService', () => {
  let service: ShuffleListItemsFromLocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = new ShuffleListItemsFromLocalStorageService();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should add many items and persist them', () => {
    const items = service.addMany(['Alpha', 'Beta']);

    expect(items.length).toBe(2);
    expect(service.shuffleList$.value.map(item => item.description)).toEqual(['Alpha', 'Beta']);
    expect(JSON.parse(localStorage.getItem('shuffleListItems') ?? '[]').length).toBe(2);
  });

  it('should update existing items', () => {
    const [item] = service.addMany(['Alpha']);

    service.update(item.id, 'Updated alpha');

    expect(service.shuffleList$.value[0].description).toBe('Updated alpha');
  });

  it('should restore and clear persisted items', () => {
    service.addMany(['Alpha']);

    const restored = new ShuffleListItemsFromLocalStorageService();
    restored.restoreFromLocalStorage();
    expect(restored.shuffleList$.value.map(item => item.description)).toEqual(['Alpha']);

    service.clear();
    expect(service.shuffleList$.value).toEqual([]);
  });
});
