import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Payroll } from '../payroll.model';
import { PayrollService } from '../payroll.service';
import { SubContractorService } from '../../subcontractor/subcontractor.service';

@Component({
  selector: 'app-payroll-edit',
  templateUrl: './payroll-edit.component.html',
  styleUrls: ['./payroll-edit.component.css']
})
export class PayrollEditComponent implements OnInit,AfterViewInit, OnDestroy {
  public weekEnding: Date;
  public paymentDate: Date;
  public monthEndingDate: Date;
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  contractorId: number;
  subContractorId: number;
  editedItemId: number;
  defaultDeductionRate: number = 0;
  defaultVatRate: number = 0;
  defaultFee: number = 0;
  saveSuccess: boolean;
  recordError: boolean;
  message: string = "";
  private sub: any;
  private sub2: any;
  public tax: number = 0;
  public vat: number = 0;
  public nett: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private payrollService: PayrollService, private subContractorService: SubContractorService) { }

  ngOnInit() {
       

            this.paymentDate = new Date();
            this.calcDates();

    this.sub =  this.route.parent.params.subscribe(params => {
            this.subContractorId = +params["id"];
        });

    
    this.route.params
      .subscribe(
        (params: Params) => {
          
          this.editedItemId = +params['pid'];
          this.sub2 = this.subContractorService.getSubContractorContractorId(this.subContractorId).subscribe(n => {
            //alert(JSON.stringify(n));
          this.contractorId = +n["c_ID"];
          this.defaultDeductionRate = +n["deductionRate"];
          this.defaultVatRate = +n["vatRate"];
          this.defaultFee = +n["fee"];

          
            this.editForm.form.patchValue({
            deductionRate: this.defaultDeductionRate,
            vatRate: this.defaultVatRate,
            gross: 0,
            fee: this.defaultFee,
            materials: 0});
        });
        }
      );
  }
  
  ngAfterViewInit(){
    if (this.editedItemId)
          {
            this.editMode = true;
            this.payrollService.getPayroll(this.editedItemId).subscribe(p => {

              this.editForm.setValue({
            weekEnding: p.weekEnding,
            paymentDate: p.paymentDate,
            monthEndingDate: p.monthEndingDate,
            deductionRate: p.deductionRate,
            vatRate: p.vatRate,
            gross: p.gross,
            fee: p.fee,
            materials: p.materials,
            //totalDeductions: 0,
            locked: p.locked,
          });});
          }
          else
          {
            this.editMode = false; 
          }

          this.editForm.valueChanges.subscribe(data => { this.calcValues(JSON.stringify(data)); });
  }

  async onSubmit(form: NgForm) {
    form.value.id = this.editedItemId;
    form.value.cid = this.contractorId;
    form.value.sid = this.subContractorId;

    if (form.value.locked === true)
      form.value.locked = 1;
    else if (form.value.locked === false)
      form.value.locked = 0;

    var result = await this.payrollService.updatePayroll(JSON.stringify(form.value));
    if (result == 'ok')
    {
      this.saveSuccess= true;
      this.recordError= false;

      if (this.editMode)
        this.message = "Record Updated";
      else
        this.message = "Record Created";

      this.NavigateToPayrolls();
    }
    else
    {
      this.message = "Record Failure";
      this.recordError= true;
    }
  }

  public paymentDates(value: Date)
  {
    this.paymentDate = new Date(value);
    this.calcDates();
  }

  calcDates()
  {
    this.monthEndingDate = new Date(this.paymentDate);
            
            var d = new Date(this.paymentDate);
            d.setDate(d.getDate() + (5+(7-d.getDay())) % 7);
            this.weekEnding = d;

            if (this.paymentDate.getDate() >= 5)
                this.monthEndingDate.setMonth(this.monthEndingDate.getMonth() + 1);

            this.monthEndingDate.setDate(5);
  }

public calcValues(data: any)
 {
    var dataObj = JSON.parse(data);
    var vatRate = dataObj['vatRate'];
    var gross = dataObj['gross'];
    var materials = dataObj['materials'];
    var deductionRate = dataObj['deductionRate'];

    this.vat = gross * (vatRate / 100);
    this.tax = ((gross - materials) * (deductionRate / 100));
    this.nett = (gross - this.tax);
 }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  async onDelete() {
    var result = await this.payrollService.deletePayroll(this.editedItemId);

    if (result == 'ok')
    {
      this.saveSuccess= true;
      this.recordError= false;
      this.message = "Record Deleted";

      this.NavigateToPayrolls();  
    }
    else
    {
      this.message = "Deletion Failed";
      this.recordError= true;
    }
  }

  NavigateToPayrolls(){
    setTimeout(()=>{ this.saveSuccess = false; this.onViewPayrolls();}, 1000)
  }
  
  onViewPayrolls(){
    var wasEditing = this.editMode;
    this.onClear();

    this.payrollService.PayrollsChanged.next(0);
    if (wasEditing)
      //this.router.navigate(['../'], {relativeTo: this.route});
     //this.router.navigate(['../../../payroll/', this.subContractorId], {queryParams: { show:'true'}, relativeTo: this.route});
     this.router.navigate(['../../'], {relativeTo: this.route});
    else
      this.router.navigate(['../'], {relativeTo: this.route});
      //this.router.navigate(['../../../payroll/', this.subContractorId], {queryParams: { show:'true'}, relativeTo: this.route});
  }

  goBack()
  {
    this.location.back();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
