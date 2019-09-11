import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphanetComponent } from './alphanet.component';

describe('AlphanetComponent', () => {
  let component: AlphanetComponent;
  let fixture: ComponentFixture<AlphanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
