import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Payroll } from '../payroll.model';
import { Deduction } from '../../shared/deduction.model';
import { PayrollService } from '../payroll.service';
import { SubContractorService } from '../../subcontractor/subcontractor.service';

declare var $:any;

@Component({
  selector: 'app-payroll-detail',
  templateUrl: './payroll-detail.component.html',
  styleUrls: ['./payroll-detail.component.css']
})
export class PayrollDetailComponent implements OnInit {
  subContractorName: string;
  payroll: Payroll;
  id: number;
  public tax: number = 0;
  public vat: number = 0;
  public nett: number = 0;
  newDeduction: Deduction = new Deduction(0,0,'',0);

  constructor(private payrollService: PayrollService, private subcontractorService: SubContractorService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['pid'];
          this.payrollService.getPayroll(this.id).subscribe(p => {
            this.payroll = p;
            this.calcValues()
            this.payrollService.getPayrollDeductions(this.payroll.p_ID).subscribe(d => {
              this.newDeduction = new Deduction(0,0,'',0);
              this.setDeductions(d);
            });
            this.subcontractorService.getSubContractor(this.payroll.s_ID).subscribe(s => this.subContractorName = s.displayName);
        });
        }
      );
      
  }

  private setDeductions(items: Deduction[])
  {
    if (items)
    {
      this.payroll.deductions = items; 

      var totalDeductions = 0;
      for(var i=0; i < this.payroll.deductions.length; i++)
        totalDeductions += this.payroll.deductions[i].amount;

      this.payroll.totalDeductions = totalDeductions;
    }
    else
      {
        this.payroll.deductions = [];
        this.payroll.totalDeductions = 0;
      }
  }

  public calcValues()
 {
    var p = this.payroll;

    this.vat = p.gross * (p.vatRate / 100);
    this.tax = ((p.gross - p.materials) * (p.deductionRate / 100));
    this.nett = (p.gross - this.tax) + this.vat;
 }
  
   onEditPayroll(){
        this.router.navigate(['edit'], {relativeTo: this.route});
    }
    
    onViewPayrolls(){
      this.payrollService.PayrollsChanged.next(0);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewInvoice(){
      this.subcontractorService.getInvoice(this.payroll.p_ID);
  }

  async onAddDeduction()
  {
    var deduction = new Deduction(0, this.payroll.p_ID, this.newDeduction.description, this.newDeduction.amount);
    var result = await this.payrollService.addPayrollDeduction(JSON.stringify(deduction));
    if (result == 'ok')
    {
      this.payrollService.getPayrollDeductions(this.payroll.p_ID).subscribe(d => this.setDeductions(d));
    }
    this.newDeduction = new Deduction(0, this.payroll.p_ID, '', 0);
    $("#addDeduction").collapse('hide');
  }

}
