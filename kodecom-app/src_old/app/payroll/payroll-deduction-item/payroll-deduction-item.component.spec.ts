import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDeductionItemComponent } from './payroll-deduction-item.component';

describe('PayrollDeductionItemComponent', () => {
  let component: PayrollDeductionItemComponent;
  let fixture: ComponentFixture<PayrollDeductionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollDeductionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollDeductionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
