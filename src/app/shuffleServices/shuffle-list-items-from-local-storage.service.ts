import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { ShuffleListItem } from 'src/models/shuffleList';
import { localStorageAvailable, retrive, save } from 'src/utils/localstorage/localstorage';

const shuffleListItems = 'shuffleListItems';

@Injectable({
  providedIn: 'root'
})
export class ShuffleListItemsFromLocalStorageService {
  shuffleList$ = new BehaviorSubject<ShuffleListItem[]>([]);
  shuffleList: ShuffleListItem[] = [];
  canSave: boolean = localStorageAvailable();

  restoreFromLocalStorage(): void {
    if (!this.canSave || this.shuffleList.length > 0) {
      return;
    }

    const items = retrive<ShuffleListItem[]>(shuffleListItems);
    if (items === null) {
      return;
    }

    this.shuffleList = items;
    this.shuffleListNext();
  }

  add(item: ShuffleListItem): ShuffleListItem {
    this.shuffleList = [...this.shuffleList, item];
    this.persist();
    return item;
  }

  addMany(descriptions: string[]): ShuffleListItem[] {
    const items = descriptions.map(description => ({
      id: uuid(),
      description,
    }));

    if (!items.length) {
      return [];
    }

    this.shuffleList = [...this.shuffleList, ...items];
    this.persist();
    return items;
  }

  update(id: string, description: string): void {
    this.shuffleList = this.shuffleList.map(item => item.id === id ? { ...item, description } : item);
    this.persist();
  }

  remove(id: string): void {
    this.shuffleList = this.shuffleList.filter(item => item.id !== id);
    this.persist();
  }

  clear(): void {
    this.shuffleList = [];
    this.persist();
  }

  private shuffleListNext(): void {
    this.shuffleList$.next(this.shuffleList);
  }

  private persist(): void {
    if (this.canSave) {
      save(shuffleListItems, this.shuffleList);
    }

    this.shuffleListNext();
  }
}
