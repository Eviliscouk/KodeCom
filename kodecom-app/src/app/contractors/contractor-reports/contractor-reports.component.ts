import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Contractor } from '../contractor.model';
import { ContractorService } from '../contractor.service';

declare var $:any;

@Component({
  selector: 'app-contractor-reports',
  templateUrl: './contractor-reports.component.html',
  styleUrls: ['./contractor-reports.component.css']
})
export class ContractorReportsComponent implements OnInit {
id: number;
public paymentDate: Date;
public monthEnd: Date;
  constructor(private route: ActivatedRoute, private router: Router, private contractorsService: ContractorService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.paymentDate = new Date();
          this.monthEnd = new Date();
        }
      );
  }

  onViewContractor()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewWeeklyRemittance()
  {
    var str = new Date(this.paymentDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.contractorsService.getContractorWeeklyRemittance(this.id, str);
  }

  onViewMonthlyReturn()
  {
    $("#myModal").modal('show');
    var str = new Date(this.monthEnd).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.contractorsService.getContractorMonthlyReturn(this.id, str);
    //$("#myModal").modal('hide');
  }

}
