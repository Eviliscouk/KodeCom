import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Deduction } from '../../shared/deduction.model';

@Component({
  selector: 'app-payroll-batch-deduction-item',
  templateUrl: './payroll-batch-deduction-item.component.html',
  styleUrls: ['./payroll-batch-deduction-item.component.css']
})
export class PayrollBatchDeductionItemComponent implements OnInit {
@Input() payrollDeduction: Deduction;
@Output() deleteDeduction = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public onDelete()
  {
    if (confirm("Are you sure to delete this deduction?"))
    {
        this.deleteDeduction.emit(this.payrollDeduction);
    }
  }

}

