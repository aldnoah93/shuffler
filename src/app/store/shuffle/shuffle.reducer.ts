import { createReducer, on } from '@ngrx/store';
import { fisherYatesShuffle } from 'src/utils/shuffle/shuffle';
import {
  addItemsSuccess,
  clearAll,
  clearShuffled,
  loadShuffleStateSuccess,
  removeItem,
  setMobileTabIndex,
  shuffleItems,
  updateItem,
} from './shuffle.actions';
import { ShuffleListItem } from 'src/models/shuffleList';
import { initialShuffleState, ShuffleState } from './shuffle.state';

function invalidate(state: ShuffleState, sourceItems: ShuffleListItem[]): ShuffleState {
  if (!sourceItems.length) {
    return {
      ...state,
      sourceItems,
      shuffledItems: [],
      status: 'empty',
      mobileTabIndex: 0,
    };
  }

  if (state.status === 'results' || state.status === 'invalidated') {
    return {
      ...state,
      sourceItems,
      shuffledItems: [],
      status: 'invalidated',
      mobileTabIndex: 0,
    };
  }

  return {
    ...state,
    sourceItems,
    status: 'ready',
  };
}

export const shuffleFeatureKey = 'shuffle';

export const shuffleReducer = createReducer(
  initialShuffleState,
  on(loadShuffleStateSuccess, (state, { items }) => ({
    ...state,
    sourceItems: items,
    shuffledItems: [],
    status: items.length ? 'ready' : 'empty',
    mobileTabIndex: 0,
  })),
  on(addItemsSuccess, (state, { items }) => invalidate(state, [...state.sourceItems, ...items])),
  on(updateItem, (state, { id, description }) => {
    const sourceItems = state.sourceItems.map(item => item.id === id ? { ...item, description } : item);
    return invalidate(state, sourceItems);
  }),
  on(removeItem, (state, { id }) => {
    const sourceItems = state.sourceItems.filter(item => item.id !== id);
    return invalidate(state, sourceItems);
  }),
  on(clearAll, state => ({
    ...state,
    sourceItems: [],
    shuffledItems: [],
    status: 'empty',
    mobileTabIndex: 0,
  })),
  on(clearShuffled, state => ({
    ...state,
    shuffledItems: [],
    status: state.sourceItems.length ? 'ready' : 'empty',
  })),
  on(shuffleItems, state => {
    if (!state.sourceItems.length) {
      return state;
    }

    return {
      ...state,
      shuffledItems: fisherYatesShuffle<ShuffleListItem>(state.sourceItems),
      status: 'results',
      mobileTabIndex: 1,
    };
  }),
  on(setMobileTabIndex, (state, { index }) => ({
    ...state,
    mobileTabIndex: index,
  }))
);
