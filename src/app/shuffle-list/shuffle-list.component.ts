import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShuffleListItem } from 'src/models/shuffleList';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shuffle-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './shuffle-list.component.html',
  styleUrls: ['./shuffle-list.component.scss']
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
