import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShuffleListItem } from 'src/models/shuffleList';

@Component({
  selector: 'app-shuffle-list',
  templateUrl: './shuffle-list.component.html',
  styleUrls: ['./shuffle-list.component.scss']
})
export class ShuffleListComponent implements OnInit {

  @Input()
  shuffleListItem: ShuffleListItem[] = [];
  
  @Output()
  itemDeleteByIdEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  itemDeleteById(id: string): void{
    this.itemDeleteByIdEvent.emit(id);
  }

}
