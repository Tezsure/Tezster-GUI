import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateWalletComponent } from './validate-wallet.component';

describe('ValidateWalletComponent', () => {
  let component: ValidateWalletComponent;
  let fixture: ComponentFixture<ValidateWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
