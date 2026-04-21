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

  it('should restore persisted items', () => {
    localStorage.setItem('shuffleListItems', JSON.stringify([{ id: '1', description: 'Alpha' }]));

    const items = service.restoreFromLocalStorage();

    expect(items).toEqual([{ id: '1', description: 'Alpha' }]);
  });

  it('should save items to local storage', () => {
    service.saveToLocalStorage([{ id: '1', description: 'Alpha' }, { id: '2', description: 'Beta' }]);

    expect(JSON.parse(localStorage.getItem('shuffleListItems') ?? '[]')).toEqual([
      { id: '1', description: 'Alpha' },
      { id: '2', description: 'Beta' },
    ]);
  });
});
