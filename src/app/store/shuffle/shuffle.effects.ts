import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { ShuffleListItemsFromLocalStorageService } from 'src/app/shuffleServices/shuffle-list-items-from-local-storage.service';
import {
  addItems,
  addItemsSuccess,
  clearAll,
  loadShuffleState,
  loadShuffleStateSuccess,
  removeItem,
  updateItem,
} from './shuffle.actions';
import { selectSourceItems } from './shuffle.selectors';

@Injectable()
export class ShuffleEffects {
  loadState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShuffleState),
      map(() => loadShuffleStateSuccess({ items: this.localStorageService.restoreFromLocalStorage() }))
    )
  );

  addItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItems),
      map(({ descriptions }) => descriptions
        .map(description => description.trim())
        .filter(Boolean)
        .map(description => ({ id: uuid(), description }))),
      map(items => addItemsSuccess({ items }))
    )
  );

  persistState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItemsSuccess, updateItem, removeItem, clearAll),
        withLatestFrom(this.store.select(selectSourceItems)),
        tap(([, items]) => this.localStorageService.saveToLocalStorage(items))
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly localStorageService: ShuffleListItemsFromLocalStorageService
  ) { }
}
