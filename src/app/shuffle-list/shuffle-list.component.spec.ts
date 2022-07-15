import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleListComponent } from './shuffle-list.component';

describe('ShuffleListComponent', () => {
  let component: ShuffleListComponent;
  let fixture: ComponentFixture<ShuffleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuffleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuffleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
