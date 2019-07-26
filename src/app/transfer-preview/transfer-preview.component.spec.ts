import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPreviewComponent } from './transfer-preview.component';

describe('TransferPreviewComponent', () => {
  let component: TransferPreviewComponent;
  let fixture: ComponentFixture<TransferPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
