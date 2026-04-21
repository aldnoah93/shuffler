import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ShuffleInputFormComponent } from './shuffle-input-form.component';

describe('ShuffleInputFormComponent', () => {
  let component: ShuffleInputFormComponent;
  let fixture: ComponentFixture<ShuffleInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ShuffleInputFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ShuffleInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit trimmed multiline items and reset the form', () => {
    spyOn(component.addItemsEvent, 'emit');
    component.descriptionControl.setValue('Alex\n\n Morgan \nTaylor ');

    component.submitForm();

    expect(component.addItemsEvent.emit).toHaveBeenCalledWith(['Alex', 'Morgan', 'Taylor']);
    expect(component.descriptionControl.value).toBe('');
  });

  it('should block empty submissions made of whitespace only', () => {
    spyOn(component.addItemsEvent, 'emit');
    component.descriptionControl.setValue(' \n  ');

    component.submitForm();

    expect(component.addItemsEvent.emit).not.toHaveBeenCalled();
    expect(component.descriptionControl.invalid).toBeTrue();
  });
});
