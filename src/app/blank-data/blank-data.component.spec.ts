import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankDataComponent } from './blank-data.component';

describe('BlankDataComponent', () => {
  let component: BlankDataComponent;
  let fixture: ComponentFixture<BlankDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
