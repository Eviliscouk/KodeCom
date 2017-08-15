import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {Http} from "@angular/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DataFilterPipe } from '../shared/data-filter.pipe';
import { PayrollService } from '../payroll/payroll.service';
import { SubContractorService } from '../subcontractor/subcontractor.service';
import { Payroll } from '../payroll/payroll.model';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  providers: [PayrollService, SubContractorService]
})
export class PayrollComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    id: number;
    selectedRow : number = 0;
    setClickedRow : Function;
    showTimesheets : boolean;

    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "paymentDate";
    public sortOrder = "desc";

    constructor(private payrollService: PayrollService, private subcontractorService: SubContractorService, private http: Http, private route: ActivatedRoute,
              private router: Router) {
        this.setClickedRow = function(index){
            this.selectedRow = index;
        }
    }

 ngOnInit(): void {
     
     this.route.params
      .subscribe(
        (params: Params) => {
          this.showTimesheets = true;
          

          this.id = +params['id'];
          this.getPayrolls();
        }
      );

      this.route.queryParams.subscribe(p => {
        var flag = p['show'];
        if (flag && flag === 'true')
          this.showTimesheets = true;
      })
      
      this.subscription = this.payrollService.PayrollsChanged.subscribe(p => { this.getPayrolls(); this.showTimesheets = true; });
    }

    getPayrolls()  {
    this.payrollService.getPayrolls(this.id).subscribe(p => { this.data = p;});
  }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }
    
    public removeItem(item: any){
        this.data = this.data.filter(x => x !== item);
    }
    
    public viewItem(item: any){
        this.showTimesheets = false;
        var payroll = item as Payroll;
        this.router.navigate([payroll.p_ID], {relativeTo: this.route});
    }
    
    public onNewPayroll() {
    this.showTimesheets = false;
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
