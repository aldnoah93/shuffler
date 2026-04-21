import { Clipboard } from '@angular/cdk/clipboard';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, of } from 'rxjs';
import { ShuffleListItem } from 'src/models/shuffleList';
import { ShuffleComponent } from './shuffle.component';
import { ShuffleListItemsFromLocalStorageService } from '../shuffleServices/shuffle-list-items-from-local-storage.service';

class ShuffleListItemsServiceMock {
  shuffleList$ = new BehaviorSubject<ShuffleListItem[]>([]);
  private nextId = 0;

  restoreFromLocalStorage = jasmine.createSpy('restoreFromLocalStorage');
  addMany = jasmine.createSpy('addMany').and.callFake((descriptions: string[]) => {
    const addedItems = descriptions.map(description => ({
      id: `item-${this.nextId++}`,
      description,
    }));

    this.shuffleList$.next([...this.shuffleList$.value, ...addedItems]);
    return addedItems;
  });
  update = jasmine.createSpy('update').and.callFake((id: string, description: string) => {
    this.shuffleList$.next(this.shuffleList$.value.map(item => item.id === id ? { ...item, description } : item));
  });
  remove = jasmine.createSpy('remove').and.callFake((id: string) => {
    this.shuffleList$.next(this.shuffleList$.value.filter(item => item.id !== id));
  });
  clear = jasmine.createSpy('clear').and.callFake(() => {
    this.shuffleList$.next([]);
  });
}

describe('ShuffleComponent', () => {
  let component: ShuffleComponent;
  let fixture: ComponentFixture<ShuffleComponent>;
  let service: ShuffleListItemsServiceMock;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let clipboard: jasmine.SpyObj<Clipboard>;

  beforeEach(async () => {
    service = new ShuffleListItemsServiceMock();
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    clipboard = jasmine.createSpyObj<Clipboard>('Clipboard', ['copy']);
    clipboard.copy.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ShuffleComponent],
      providers: [
        { provide: ShuffleListItemsFromLocalStorageService, useValue: service },
        { provide: MatDialog, useValue: dialog },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: Clipboard, useValue: clipboard },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add items and keep the workspace ready before shuffling', () => {
    component.addItems(['Alpha', 'Beta']);

    expect(service.addMany).toHaveBeenCalledWith(['Alpha', 'Beta']);
    expect(component.shuffleItems.length).toBe(2);
    expect(component.status).toBe('ready');
    expect(snackBar.open).toHaveBeenCalledWith('2 items added to the source list.', 'Close', { duration: 2200 });
  });

  it('should invalidate existing results when the source list changes after a shuffle', () => {
    component.addItems(['Alpha', 'Beta']);

    component.shuffle();
    expect(component.status).toBe('results');
    expect(component.shuffledItems.length).toBe(2);

    component.addItems(['Gamma']);

    expect(component.status).toBe('invalidated');
    expect(component.shuffledItems).toEqual([]);
  });

  it('should update a source item through the edit dialog', () => {
    component.addItems(['Alpha']);
    const item = component.shuffleItems[0];
    dialog.open.and.returnValue({ afterClosed: () => of('Updated alpha') } as never);

    component.editItem(item);

    expect(service.update).toHaveBeenCalledWith(item.id, 'Updated alpha');
    expect(component.shuffleItems[0].description).toBe('Updated alpha');
  });

  it('should clear all source data after confirmation', () => {
    component.addItems(['Alpha']);
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as never);

    component.confirmClearAll();

    expect(service.clear).toHaveBeenCalled();
    expect(component.shuffleItems).toEqual([]);
    expect(component.status).toBe('empty');
  });

  it('should copy the shuffled list when results are present', () => {
    component.addItems(['Alpha', 'Beta']);
    component.shuffle();

    component.copyShuffledList();

    expect(clipboard.copy).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Shuffled list copied.', 'Close', { duration: 2200 });
  });
});
