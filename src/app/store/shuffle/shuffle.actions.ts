import { createAction, props } from '@ngrx/store';
import { ShuffleListItem } from 'src/models/shuffleList';

export const loadShuffleState = createAction('[Shuffle] Load State');

export const loadShuffleStateSuccess = createAction(
  '[Shuffle] Load State Success',
  props<{ items: ShuffleListItem[] }>()
);

export const addItems = createAction(
  '[Shuffle] Add Items',
  props<{ descriptions: string[] }>()
);

export const addItemsSuccess = createAction(
  '[Shuffle] Add Items Success',
  props<{ items: ShuffleListItem[] }>()
);

export const updateItem = createAction(
  '[Shuffle] Update Item',
  props<{ id: string; description: string }>()
);

export const removeItem = createAction(
  '[Shuffle] Remove Item',
  props<{ id: string }>()
);

export const clearAll = createAction('[Shuffle] Clear All');

export const clearShuffled = createAction('[Shuffle] Clear Shuffled');

export const shuffleItems = createAction('[Shuffle] Shuffle Items');

export const setMobileTabIndex = createAction(
  '[Shuffle] Set Mobile Tab Index',
  props<{ index: number }>()
);
