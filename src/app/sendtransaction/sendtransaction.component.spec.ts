import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtransactionComponent } from './sendtransaction.component';

describe('SendtransactionComponent', () => {
  let component: SendtransactionComponent;
  let fixture: ComponentFixture<SendtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
