import { Injectable } from '@angular/core';
import { ShuffleListItem } from 'src/models/shuffleList';
import { localStorageAvailable, retrive, save } from 'src/utils/localstorage/localstorage';

const shuffleListItems = 'shuffleListItems';

@Injectable({
  providedIn: 'root'
})
export class ShuffleListItemsFromLocalStorageService {
  canSave: boolean = localStorageAvailable();

  restoreFromLocalStorage(): ShuffleListItem[] {
    if (!this.canSave) {
      return [];
    }

    const items = retrive<ShuffleListItem[]>(shuffleListItems);
    return items ?? [];
  }

  saveToLocalStorage(items: ShuffleListItem[]): void {
    if (this.canSave) {
      save(shuffleListItems, items);
    }
  }
}
