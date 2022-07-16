import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ShuffleListItem } from 'src/models/shuffleList';


const shuffleListItems = "shuffleListItems";
@Injectable({
  providedIn: 'root'
})
export class ShuffleListItemsFromLocalStorageService {

  shuffleList$: BehaviorSubject<Array<ShuffleListItem>> = new BehaviorSubject<Array<ShuffleListItem>>([]);
  shuffleList: Array<ShuffleListItem> = [];


  constructor(private _snackBar: MatSnackBar) { }

  restoreFromLocalStorage(): void {
    if(this.shuffleList.length > 0) return;

    const itemsAsString = localStorage.getItem(shuffleListItems);

    if(itemsAsString === null) return;

    this.shuffleList = JSON.parse(itemsAsString);
    this.shuffleListNext();
  }

  shuffleListNext(): void {
    this.shuffleList$.next(this.shuffleList);
  }

  save(): void {
    const itemsAsString = JSON.stringify(this.shuffleList);
    localStorage.setItem(shuffleListItems, itemsAsString);
  }

  add(item: ShuffleListItem): void {
    this.shuffleList.push(item);
    this.save();
    this.shuffleListNext();
    this._snackBar.open("A new item has been added", "Close", { duration: 2000 });
  }

  remove(id: string): void {
    this.shuffleList = this.shuffleList.filter(item => item.id !== id);
    this.save();
    this.shuffleListNext();
    this._snackBar.open("An item has been deleted", "Close", { duration: 2000 });
  }


}
