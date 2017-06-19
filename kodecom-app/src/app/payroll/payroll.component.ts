import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataFilterPipe } from '../shared/data-filter.pipe';
import { PayrollService } from '../payroll/payroll.service';
import { SubContractorService } from '../subcontractor/subcontractor.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  providers: [PayrollService, SubContractorService]
})
export class PayrollComponent implements OnInit {
    id: number;
    contractorName: string;
    selectedRow : Number;
    setClickedRow : Function;

    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

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
          this.id = +params['id'];
          this.contractorName = this.subcontractorService.getSubContractorName(this.id);
          this.data = this.payrollService.getPayrolls(this.id);
        }
      );
      
      
        // this.http.get("./payroll.json")
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data = data.json();
        //             alert(data);
        //         }, 1000);
        //     });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }
    
    public removeItem(item: any)
    {
        this.data = this.data.filter(x => x !== item);
    }

}
