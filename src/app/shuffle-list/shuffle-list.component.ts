import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShuffleListItem } from 'src/models/shuffleList';

@Component({
    selector: 'app-shuffle-list',
    templateUrl: './shuffle-list.component.html',
    styleUrls: ['./shuffle-list.component.scss'],
    standalone: false
})
export class ShuffleListComponent implements OnInit {

  @Input()
  listTitle: string = "List";

  @Input()
  canDelete: boolean = true;

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
