import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShuffleListItem } from 'src/models/shuffleList';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditItemDialogComponent } from '../dialogs/edit-item-dialog/edit-item-dialog.component';
import {
  addItems,
  clearAll,
  clearShuffled,
  loadShuffleState,
  removeItem,
  setMobileTabIndex,
  shuffleItems,
  updateItem,
} from '../store/shuffle/shuffle.actions';
import { selectShuffleViewModel } from '../store/shuffle/shuffle.selectors';
import { ShuffleStatus } from '../store/shuffle/shuffle.state';

@Component({
    selector: 'app-shuffle',
    templateUrl: './shuffle.component.html',
    styleUrls: ['./shuffle.component.scss'],
    standalone: false
})
export class ShuffleComponent implements OnInit, OnDestroy {
  viewModel$?: Subscription;

  shuffleItems: ShuffleListItem[] = [];
  shuffledItems: ShuffleListItem[] = [];
  status: ShuffleStatus = 'empty';
  mobileTabIndex: number = 0;

  constructor(
    private readonly clipboard: Clipboard,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly store: Store
  ) { }

  ngOnDestroy(): void {
    this.viewModel$?.unsubscribe();
  }

  ngOnInit(): void {
    this.viewModel$ = this.store.select(selectShuffleViewModel).subscribe(viewModel => {
      this.shuffleItems = viewModel.sourceItems;
      this.shuffledItems = viewModel.shuffledItems;
      this.status = viewModel.status;
      this.mobileTabIndex = viewModel.mobileTabIndex;
    });

    this.store.dispatch(loadShuffleState());
  }

  get sourceCountLabel(): string {
    return `${this.shuffleItems.length} ${this.shuffleItems.length === 1 ? 'source item' : 'source items'}`;
  }

  get hasResults(): boolean {
    return this.status === 'results' && this.shuffledItems.length > 0;
  }

  get canShuffle(): boolean {
    return this.shuffleItems.length > 0;
  }

  get canCopy(): boolean {
    return this.hasResults;
  }

  get canClearShuffled(): boolean {
    return this.shuffledItems.length > 0;
  }

  get statusLabel(): string {
    switch (this.status) {
      case 'empty':
        return 'Add items to begin';
      case 'ready':
        return 'Ready to shuffle';
      case 'results':
        return 'Latest order shown';
      case 'invalidated':
        return 'Source changed';
    }
  }

  get statusHint(): string {
    switch (this.status) {
      case 'empty':
        return 'Paste one or more items into the input panel to build your source list.';
      case 'ready':
        return 'Your source list is current. Shuffle when you want a new order.';
      case 'results':
        return 'This shuffled order matches the current source list.';
      case 'invalidated':
        return 'The source list changed after the last shuffle. Shuffle again to refresh the output.';
    }
  }

  get statusChipClass(): string {
    return this.status === 'invalidated' ? 'app-chip app-chip--warn' : 'app-chip app-chip--strong';
  }

  get shuffledEmptyTitle(): string {
    switch (this.status) {
      case 'empty':
        return 'Shuffle results will appear here.';
      case 'ready':
        return 'Ready for your first shuffle.';
      case 'invalidated':
        return 'Source changed. Shuffle again.';
      default:
        return 'Shuffle results will appear here.';
    }
  }

  get shuffledEmptyMessage(): string {
    switch (this.status) {
      case 'empty':
        return 'Build the source list first, then generate a random order whenever you need it.';
      case 'ready':
        return 'Your source list is ready. Use Shuffle to generate a random order.';
      case 'invalidated':
        return 'The previous output was cleared so you always know the shuffled list is current.';
      default:
        return 'Build the source list first, then generate a random order whenever you need it.';
    }
  }

  addItems(descriptions: string[]): void {
    const filteredDescriptions = descriptions.map(description => description.trim()).filter(Boolean);
    if (!filteredDescriptions.length) {
      return;
    }

    this.store.dispatch(addItems({ descriptions: filteredDescriptions }));
    const itemLabel = filteredDescriptions.length === 1 ? 'item' : 'items';
    this.snackBar.open(`${filteredDescriptions.length} ${itemLabel} added to the source list.`, 'Close', { duration: 2200 });
  }

  deleteItem(item: ShuffleListItem): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'shuffler-dialog',
      data: {
        title: 'Delete source item?',
        message: `Remove "${item.description}" from the source list and any future shuffles.`,
        confirmLabel: 'Delete item',
        tone: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.store.dispatch(removeItem({ id: item.id }));
    });
  }

  editItem(item: ShuffleListItem): void {
    const dialogRef = this.dialog.open(EditItemDialogComponent, {
      panelClass: 'shuffler-dialog',
      data: { description: item.description },
      width: 'min(92vw, 34rem)',
    });

    dialogRef.afterClosed().subscribe((description: string | undefined) => {
      const trimmedDescription = description?.trim();
      if (!trimmedDescription || trimmedDescription === item.description) {
        return;
      }

      this.store.dispatch(updateItem({ id: item.id, description: trimmedDescription }));
    });
  }

  confirmClearAll(): void {
    if (!this.shuffleItems.length) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'shuffler-dialog',
      data: {
        title: 'Clear the entire source list?',
        message: 'This removes every source item and any current shuffled order.',
        confirmLabel: 'Clear all',
        tone: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.store.dispatch(clearAll());
    });
  }

  clearShuffled(): void {
    this.store.dispatch(clearShuffled());
  }

  shuffle(): void {
    if (!this.canShuffle) {
      return;
    }

    this.store.dispatch(shuffleItems());
    this.snackBar.open('Shuffled order generated.', 'Close', { duration: 2200 });
  }

  copyShuffledList(): void {
    if (!this.canCopy) {
      return;
    }

    const output = this.shuffledItems
      .map((item, index) => `${index + 1}. ${item.description}`)
      .join('\n');

    if (this.clipboard.copy(output)) {
      this.snackBar.open('Shuffled list copied.', 'Close', { duration: 2200 });
      return;
    }

    this.snackBar.open('Could not copy the shuffled list.', 'Close', { duration: 2200 });
  }

  onMobileTabIndexChange(index: number): void {
    this.store.dispatch(setMobileTabIndex({ index }));
  }
}
