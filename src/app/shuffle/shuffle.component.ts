import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Subscription } from 'rxjs';
import { ShuffleListItem } from 'src/models/shuffleList';
import { fisherYatesShuffle } from 'src/utils/shuffle/shuffle';
import { v4 as uuid } from "uuid";
import { ShuffleListItemsFromLocalStorageService } from '../shuffleServices/shuffle-list-items-from-local-storage.service';

@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit, OnDestroy {

  shuffleItems$?: Subscription;

  shuffleItems: ShuffleListItem[] = [];
  shuffledItems: ShuffleListItem[] = [];

  constructor(private _snackBar: MatSnackBar, private shuffleListItemsFromLocalStorageService: ShuffleListItemsFromLocalStorageService) { }

  ngOnDestroy(): void {
    this.shuffleItems$?.unsubscribe();
  }

  ngOnInit(): void {
    this.shuffleItems$ = this.shuffleListItemsFromLocalStorageService.shuffleList$.subscribe(list => this.shuffleItems = list);
    this.shuffleListItemsFromLocalStorageService.restoreFromLocalStorage();
  }

  addItem(description:string){
    this.shuffleListItemsFromLocalStorageService.add({id: uuid(), description: description});    
  }
  deleteItemById(id:string):void{
    this.shuffleListItemsFromLocalStorageService.remove(id);
    this.shuffledItems = this.shuffledItems.filter(item => item.id !== id);
  }

  shuffle(): void {
    this.shuffledItems = fisherYatesShuffle<ShuffleListItem>(this.shuffleItems);
    this._snackBar.open("The items have been shuffled", "Close", { duration: 2000 });
  }

}
