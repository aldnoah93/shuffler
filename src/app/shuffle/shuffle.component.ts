import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShuffleListItem } from 'src/models/shuffleList';
import { fisherYatesShuffle } from 'src/utils/shuffle/shuffle';
import { v4 as uuid } from "uuid";

@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit {

  shuffleItems: ShuffleListItem[] = [];
  shuffledItems: ShuffleListItem[] = [];

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addItem(description:string){
    this.shuffleItems.push({id: uuid(), description: description});
    this._snackBar.open("A new item has been added", "Close", { duration: 2000 });
  }
  deleteItemById(id:string):void{
    this.shuffleItems = this.shuffleItems.filter(item => item.id !== id);
    this.shuffledItems = this.shuffledItems.filter(item => item.id !== id);
    this._snackBar.open("An item has been deleted", "Close", { duration: 2000 });
  }

  shuffle(): void {
    this.shuffledItems = fisherYatesShuffle<ShuffleListItem>(this.shuffleItems);
    console.log(this.shuffledItems);
    this._snackBar.open("The items have been shuffled", "Close", { duration: 2000 });
  }

}
