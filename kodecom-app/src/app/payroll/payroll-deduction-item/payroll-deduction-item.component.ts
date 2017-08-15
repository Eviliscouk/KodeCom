import { Component, OnInit, Input } from '@angular/core';

import { Deduction } from '../../shared/deduction.model';

@Component({
  selector: 'app-payroll-deduction-item',
  templateUrl: './payroll-deduction-item.component.html',
  styleUrls: ['./payroll-deduction-item.component.css']
})
export class PayrollDeductionItemComponent implements OnInit {
@Input() payrollDeduction: Deduction;
  constructor() { }

  ngOnInit() {
  }

}
