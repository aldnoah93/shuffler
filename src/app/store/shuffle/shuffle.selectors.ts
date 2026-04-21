import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shuffleFeatureKey } from './shuffle.reducer';
import { ShuffleState } from './shuffle.state';

export const selectShuffleState = createFeatureSelector<ShuffleState>(shuffleFeatureKey);

export const selectSourceItems = createSelector(selectShuffleState, state => state.sourceItems);
export const selectShuffledItems = createSelector(selectShuffleState, state => state.shuffledItems);
export const selectStatus = createSelector(selectShuffleState, state => state.status);
export const selectMobileTabIndex = createSelector(selectShuffleState, state => state.mobileTabIndex);

export const selectCanShuffle = createSelector(selectSourceItems, items => items.length > 0);
export const selectHasResults = createSelector(
  selectStatus,
  selectShuffledItems,
  (status, shuffledItems) => status === 'results' && shuffledItems.length > 0
);
export const selectCanCopy = createSelector(selectHasResults, hasResults => hasResults);
export const selectCanClearShuffled = createSelector(selectShuffledItems, items => items.length > 0);

export const selectStatusLabel = createSelector(selectStatus, status => {
  switch (status) {
    case 'empty':
      return 'Add items to begin';
    case 'ready':
      return 'Ready to shuffle';
    case 'results':
      return 'Latest order shown';
    case 'invalidated':
      return 'Source changed';
    default:
      return 'Add items to begin';
  }
});

export const selectStatusHint = createSelector(selectStatus, status => {
  switch (status) {
    case 'empty':
      return 'Paste one or more items into the input panel to build your source list.';
    case 'ready':
      return 'Your source list is current. Shuffle when you want a new order.';
    case 'results':
      return 'This shuffled order matches the current source list.';
    case 'invalidated':
      return 'The source list changed after the last shuffle. Shuffle again to refresh the output.';
    default:
      return 'Paste one or more items into the input panel to build your source list.';
  }
});

export const selectStatusChipClass = createSelector(
  selectStatus,
  status => status === 'invalidated' ? 'app-chip app-chip--warn' : 'app-chip app-chip--strong'
);

export const selectShuffledEmptyTitle = createSelector(selectStatus, status => {
  switch (status) {
    case 'empty':
      return 'Shuffle results will appear here.';
    case 'ready':
      return 'Ready for your first shuffle.';
    case 'invalidated':
      return 'Source changed. Shuffle again.';
    default:
      return 'Shuffle results will appear here.';
  }
});

export const selectShuffledEmptyMessage = createSelector(selectStatus, status => {
  switch (status) {
    case 'empty':
      return 'Build the source list first, then generate a random order whenever you need it.';
    case 'ready':
      return 'Your source list is ready. Use Shuffle to generate a random order.';
    case 'invalidated':
      return 'The previous output was cleared so you always know the shuffled list is current.';
    default:
      return 'Build the source list first, then generate a random order whenever you need it.';
  }
});

export const selectShuffleViewModel = createSelector(
  selectSourceItems,
  selectShuffledItems,
  selectStatus,
  selectCanShuffle,
  selectCanCopy,
  selectCanClearShuffled,
  selectStatusLabel,
  selectStatusHint,
  selectStatusChipClass,
  selectShuffledEmptyTitle,
  selectShuffledEmptyMessage,
  selectMobileTabIndex,
  (
    sourceItems,
    shuffledItems,
    status,
    canShuffle,
    canCopy,
    canClearShuffled,
    statusLabel,
    statusHint,
    statusChipClass,
    shuffledEmptyTitle,
    shuffledEmptyMessage,
    mobileTabIndex
  ) => ({
    sourceItems,
    shuffledItems,
    status,
    canShuffle,
    canCopy,
    canClearShuffled,
    statusLabel,
    statusHint,
    statusChipClass,
    shuffledEmptyTitle,
    shuffledEmptyMessage,
    mobileTabIndex,
  })
);
