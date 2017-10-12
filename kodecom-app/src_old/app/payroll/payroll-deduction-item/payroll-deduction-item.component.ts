import { Component, OnInit, Input } from '@angular/core';

import { Deduction } from '../../shared/deduction.model';

import { PayrollService } from '../../payroll/payroll.service';

@Component({
  selector: 'app-payroll-deduction-item',
  templateUrl: './payroll-deduction-item.component.html',
  styleUrls: ['./payroll-deduction-item.component.css']
})
export class PayrollDeductionItemComponent implements OnInit {
@Input() payrollDeduction: Deduction;
  constructor(private payrollService: PayrollService,) { }

  ngOnInit() {
  }

  public onDelete()
  {
    if (confirm("Are you sure to delete this deduction?"))
    {
        this.payrollService.deletePayrollDeduction(this.payrollDeduction.id);
    }
  }

}
