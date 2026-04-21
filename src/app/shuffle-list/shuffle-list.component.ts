import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShuffleListItem } from 'src/models/shuffleList';

@Component({
    selector: 'app-shuffle-list',
    templateUrl: './shuffle-list.component.html',
    styleUrls: ['./shuffle-list.component.scss'],
    standalone: false
})
export class ShuffleListComponent {
  @Input()
  listTitle: string = "List";

  @Input()
  listEyebrow: string = "List";

  @Input()
  listHint: string = "";

  @Input()
  emptyTitle: string = "Nothing here yet.";

  @Input()
  emptyMessage: string = "Add items to populate this list.";

  @Input()
  readOnly: boolean = false;

  @Input()
  canDelete: boolean = true;

  @Input()
  canEdit: boolean = false;

  @Input()
  shuffleListItem: ShuffleListItem[] = [];

  @Output()
  itemDeleteEvent = new EventEmitter<ShuffleListItem>();

  @Output()
  itemEditEvent = new EventEmitter<ShuffleListItem>();

  trackById(index: number, item: ShuffleListItem): string {
    return item.id;
  }

  editItem(item: ShuffleListItem): void {
    this.itemEditEvent.emit(item);
  }

  itemDelete(item: ShuffleListItem): void{
    this.itemDeleteEvent.emit(item);
  }
}
