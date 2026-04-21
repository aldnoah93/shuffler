import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shuffle-header',
  templateUrl: './shuffle-header.component.html',
  styleUrls: ['./shuffle-header.component.scss'],
  standalone: false,
})
export class ShuffleHeaderComponent {
  @Input()
  sourceItemsCount: number = 0;

  @Input()
  shuffledItemsCount: number = 0;

  @Input()
  canCopy: boolean = false;

  @Input()
  canClearShuffled: boolean = false;

  @Input()
  canShuffle: boolean = false;

  @Output()
  copyShuffledEvent = new EventEmitter<void>();

  @Output()
  clearShuffledEvent = new EventEmitter<void>();

  @Output()
  clearAllEvent = new EventEmitter<void>();

  @Output()
  shuffleEvent = new EventEmitter<void>();

  copyShuffled(): void {
    this.copyShuffledEvent.emit();
  }

  clearShuffled(): void {
    this.clearShuffledEvent.emit();
  }

  clearAll(): void {
    this.clearAllEvent.emit();
  }

  shuffle(): void {
    this.shuffleEvent.emit();
  }
}
