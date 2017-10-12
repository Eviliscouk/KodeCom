import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollBatchComponent } from './payroll-batch.component';

describe('PayrollBatchComponent', () => {
  let component: PayrollBatchComponent;
  let fixture: ComponentFixture<PayrollBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
