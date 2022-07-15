import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleInputFormComponent } from './shuffle-input-form.component';

describe('ShuffleInputFormComponent', () => {
  let component: ShuffleInputFormComponent;
  let fixture: ComponentFixture<ShuffleInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuffleInputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuffleInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
