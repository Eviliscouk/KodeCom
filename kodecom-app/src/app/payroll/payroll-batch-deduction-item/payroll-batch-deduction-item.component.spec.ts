import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollBatchDeductionItemComponent } from './payroll-batch-deduction-item.component';

describe('PayrollBatchDeductionItemComponent', () => {
  let component: PayrollBatchDeductionItemComponent;
  let fixture: ComponentFixture<PayrollBatchDeductionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollBatchDeductionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollBatchDeductionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
