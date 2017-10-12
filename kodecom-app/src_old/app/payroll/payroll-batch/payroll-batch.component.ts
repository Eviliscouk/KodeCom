import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { PayrollService } from '../payroll.service';
import { SubContractorService } from '../../subcontractor/subcontractor.service';
import { SubContractorName } from '../../subcontractor/subcontractor-list/subcontractorName.model';
import { Payroll } from '../payroll.model';

@Component({
  selector: 'app-payroll-batch',
  templateUrl: './payroll-batch.component.html',
  styleUrls: ['./payroll-batch.component.css'],
  providers: [PayrollService, SubContractorService]
})
export class PayrollBatchComponent implements OnInit {
public hasBeenSubmitted : boolean;
public weekEnding: Date;
public paymentDate: Date;
public monthEndingDate: Date;
@ViewChild('f') editForm: NgForm;
id: number;
subcontractorNames: SubContractorName[];
payrollItems: Payroll[] = [];
excludedPayrollItems: Payroll[] = [];
totalGross: number;
totalMaterials: number;
totalFees: number;
totalTax: number;
totalVat: number;
totalNett: number;

  constructor(private payrollService: PayrollService, private subcontractorService: SubContractorService, private http: Http, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
     
     this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.GetSubcontractorNames();          
        }
      );

      this.editForm.valueChanges.subscribe(data => {

        this.calcValues(JSON.stringify(data));
        
      });
  }

  public GetSubcontractorNames(){
    this.subcontractorService.getSubContractorNames(this.id, 1).subscribe(subcontractors => {
            this.subcontractorNames = subcontractors;
            this.hasBeenSubmitted = false; 
            this.AddPayrollItems();});
  }

  AddPayrollItems()
  {
      this.setDates();

      this.subcontractorNames.forEach(
        s => {
          var p = new Payroll();
          p.c_ID = this.id;
          p.s_ID = s.s_ID;
          p.weekEnding = this.weekEnding;
          p.paymentDate = this.paymentDate;
          p.monthEndingDate = this.monthEndingDate;
          p.deductionRate = s.deductionRate;
          p.vatRate = s.vatRate;
          p.fee = s.fee;
          p.gross = 0;
          p.materials = 0;
          this.payrollItems.push(p);
        })
  };

  public paymentDates(value: Date)
  {
    this.paymentDate = new Date(value);
    this.calcDates();
  }

  public setDates()
  {
    this.paymentDate = new Date();
    this.calcDates();
  }

  public weekEndingOveride(value: Date)
  {
    this.weekEnding = new Date(value);
    this.updateItemDates();
  }

  public calcDates()
  {
    this.monthEndingDate = new Date(this.paymentDate);
    
    var d = new Date(this.paymentDate);
    d.setDate(d.getDate() + (5+(7-d.getDay())) % 7);
    this.weekEnding = d;

    if (this.paymentDate.getDate() >= 5)
        this.monthEndingDate.setMonth(this.monthEndingDate.getMonth() + 1);

    this.monthEndingDate.setDate(5);
    this.updateItemDates();
  }

  public updateItemDates()
  {
    for(var i in this.payrollItems)
        {
            var obj = this.payrollItems[i];
            obj.paymentDate = this.paymentDate;
            obj.monthEndingDate = this.monthEndingDate;
            obj.weekEnding = this.weekEnding;
        }
  }

 public calcValues(data: any)
 {
   var dataObj = JSON.parse(data);

   this.totalGross = 0;
   this.totalMaterials = 0;
   this.totalFees = 0;
   this.totalTax = 0;
   this.totalVat = 0;
   this.totalNett = 0;
   
   for(var i in this.payrollItems)
        {
            var obj = this.payrollItems[i];
            var vatRate = dataObj['vatRate_' + obj.s_ID];
            var gross = dataObj['gross_' + obj.s_ID];
            var materials = dataObj['materials_' + obj.s_ID];
            var deductionRate = dataObj['deductionRate_' + obj.s_ID];
            var fee = dataObj['fee_' + obj.s_ID];

            obj.deductionRate = deductionRate;
            obj.vatRate = vatRate;
            obj.gross = gross;
            obj.materials = materials;
            obj.fee = fee;

            obj.vat = gross * (vatRate / 100);
            obj.tax = ((gross - materials) * (deductionRate / 100));
            obj.nett = (gross - obj.tax);

            this.totalGross += Number(gross);
            this.totalMaterials += Number(materials);
            this.totalFees += Number(fee);
            this.totalTax += Number(obj.tax);
            this.totalVat += Number(obj.vat);
            this.totalNett += Number(obj.nett);
        }
 }

  public reloadItems()
  {
    this.payrollItems.length = 0; 
    this.excludedPayrollItems.length = 0;
    this.GetSubcontractorNames();
  }

  public removeItem(item: Payroll){
        this.excludedPayrollItems.push(item);
        this.payrollItems = this.payrollItems.filter(x => x.s_ID !== item.s_ID);
    }
  
   public reAddItem(item: Payroll){
        this.excludedPayrollItems = this.excludedPayrollItems.filter(x => x.s_ID !== item.s_ID);
        this.payrollItems.push(item);
    }

    public GetSubcontractorName(id: number){
        return this.subcontractorNames.find(x => x.s_ID == id).displayName;
    }
  
   async onSubmit(form: NgForm) {
      for(var i in this.payrollItems)
        {
          var obj = this.payrollItems[i];

          if (!obj.saveSuccess)
          {
            var str = JSON.stringify(obj);

            var str = str.replace("\"c_ID\":", "\"cid\":");
            var str = str.replace("\"s_ID\":", "\"sid\":");
            var str = str.replace("\"s_ID\":", "\"sid\":");
            var newObj = JSON.parse(str);
            newObj["locked"] = 0;
            str = JSON.stringify(newObj);

            var result = await this.payrollService.updatePayroll(str);         

            if (result == 'ok')
            {
              obj.saveSuccess= true;
              obj.recordError= false;
              obj.message = "Record Created";
            }
            else
            {
              obj.saveSuccess= false;
              obj.recordError= true;
              obj.message = "Record Error";
            }
          }
        }
        this.hasBeenSubmitted = true;
   }

    public onViewContractor()
    {
      this.router.navigate(['../../contractors/', this.id], {relativeTo: this.route})
    }

    ngOnDestroy() {
  }

}
