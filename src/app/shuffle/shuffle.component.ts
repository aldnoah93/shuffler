import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShuffleListItem } from 'src/models/shuffleList';
import { v4 as uuid } from "uuid";

@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit {

  shuffleItems: ShuffleListItem[] = [];

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addItem(description:string){
    this.shuffleItems.push({id: uuid(), description: description});
    this._snackBar.open("A new item has been added", "Close", { duration: 2000 });
  }

}
