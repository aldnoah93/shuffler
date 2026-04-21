import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ShuffleListItem } from 'src/models/shuffleList';
import { ShuffleListComponent } from './shuffle-list.component';

describe('ShuffleListComponent', () => {
  let component: ShuffleListComponent;
  let fixture: ComponentFixture<ShuffleListComponent>;
  const item: ShuffleListItem = { id: '1', description: 'Alpha' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ShuffleListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShuffleListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit edit and delete events for source items', () => {
    component.shuffleListItem = [item];
    component.canEdit = true;
    component.canDelete = true;
    fixture.detectChanges();

    spyOn(component.itemEditEvent, 'emit');
    spyOn(component.itemDeleteEvent, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    buttons[1].click();

    expect(component.itemEditEvent.emit).toHaveBeenCalledWith(item);
    expect(component.itemDeleteEvent.emit).toHaveBeenCalledWith(item);
  });

  it('should hide actions when the list is read only', () => {
    component.shuffleListItem = [item];
    component.readOnly = true;
    component.canEdit = false;
    component.canDelete = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('button').length).toBe(0);
    expect(compiled.textContent).toContain('Read only');
  });
});
