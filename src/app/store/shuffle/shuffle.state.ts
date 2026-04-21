import { ShuffleListItem } from 'src/models/shuffleList';

export type ShuffleStatus = 'empty' | 'ready' | 'results' | 'invalidated';

export interface ShuffleState {
  sourceItems: ShuffleListItem[];
  shuffledItems: ShuffleListItem[];
  status: ShuffleStatus;
  mobileTabIndex: number;
}

export const initialShuffleState: ShuffleState = {
  sourceItems: [],
  shuffledItems: [],
  status: 'empty',
  mobileTabIndex: 0,
};
