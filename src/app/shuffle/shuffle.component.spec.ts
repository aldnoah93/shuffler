import { Clipboard } from '@angular/cdk/clipboard';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ShuffleComponent } from './shuffle.component';
import {
  addItems,
  clearAll,
  loadShuffleState,
  removeItem,
  shuffleItems,
  updateItem,
} from '../store/shuffle/shuffle.actions';
import { shuffleFeatureKey } from '../store/shuffle/shuffle.reducer';
import { initialShuffleState } from '../store/shuffle/shuffle.state';

describe('ShuffleComponent', () => {
  let component: ShuffleComponent;
  let fixture: ComponentFixture<ShuffleComponent>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let clipboard: jasmine.SpyObj<Clipboard>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    clipboard = jasmine.createSpyObj<Clipboard>('Clipboard', ['copy']);
    clipboard.copy.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ShuffleComponent],
      providers: [
        provideMockStore({
          initialState: {
            [shuffleFeatureKey]: {
              ...initialShuffleState,
              sourceItems: [
                { id: 'item-1', description: 'Alpha' },
                { id: 'item-2', description: 'Beta' },
              ],
              status: 'ready',
            },
          },
        }),
        { provide: MatDialog, useValue: dialog },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: Clipboard, useValue: clipboard },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ShuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addItems when form values are submitted', () => {
    component.addItems(['Alpha', 'Beta']);

    expect(dispatchSpy).toHaveBeenCalledWith(addItems({ descriptions: ['Alpha', 'Beta'] }));
    expect(snackBar.open).toHaveBeenCalledWith('2 items added to the source list.', 'Close', { duration: 2200 });
  });

  it('should dispatch shuffleItems when shuffling', () => {
    component.shuffle();

    expect(dispatchSpy).toHaveBeenCalledWith(shuffleItems());
  });

  it('should dispatch updateItem through the edit dialog', () => {
    const item = component.shuffleItems[0];
    dialog.open.and.returnValue({ afterClosed: () => of('Updated alpha') } as never);

    component.editItem(item);

    expect(dispatchSpy).toHaveBeenCalledWith(updateItem({ id: item.id, description: 'Updated alpha' }));
  });

  it('should dispatch clearAll after confirmation', () => {
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as never);

    component.confirmClearAll();

    expect(dispatchSpy).toHaveBeenCalledWith(clearAll());
  });

  it('should dispatch removeItem after delete confirmation', () => {
    const item = component.shuffleItems[0];
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as never);

    component.deleteItem(item);

    expect(dispatchSpy).toHaveBeenCalledWith(removeItem({ id: item.id }));
  });

  it('should copy the shuffled list when results are present', () => {
    component.shuffledItems = [
      { id: 'item-1', description: 'Alpha' },
      { id: 'item-2', description: 'Beta' },
    ];
    component.status = 'results';

    component.copyShuffledList();

    expect(clipboard.copy).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Shuffled list copied.', 'Close', { duration: 2200 });
  });

  it('should dispatch loadShuffleState on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadShuffleState());
  });
});
