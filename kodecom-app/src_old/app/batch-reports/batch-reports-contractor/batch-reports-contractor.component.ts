import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Contractor } from '../../contractors/contractor.model';
import { ContractorService } from '../../contractors/contractor.service';

declare var $:any;

@Component({
  selector: 'app-batch-reports-contractor',
  templateUrl: './batch-reports-contractor.component.html',
  styleUrls: ['./batch-reports-contractor.component.css'],
  providers: [ContractorService]
})
export class BatchReportsContractorComponent implements OnInit {
public paymentDate: Date;
public monthEnd: Date;
public fromDate: Date;
public toDate: Date;

  constructor(private route: ActivatedRoute, private router: Router, private contractorsService: ContractorService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.paymentDate = new Date();
          this.monthEnd = new Date();
          this.fromDate = new Date();
          this.toDate = new Date();
        }
      );
  }

  async onRunWeeklyRemittance()
  {
    var str = new Date(this.paymentDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    $("#myModal").modal('show');
    var result = await this.contractorsService.getBatchContractorWeeklyRemittance(str);
    if (result != 'Ok')
      alert('Failed to generate batch!');
    $("#myModal").modal('hide');
    
  }

  async onRunMonthlyReturn()
  {
    //$("#myModal").modal('show');
    var str = new Date(this.monthEnd).toLocaleDateString('en-GB').replace(/\//g, "-");
    $("#myModal").modal('show');
    var result = await this.contractorsService.getBatchContractorMonthlyReturn(str);
    if (result != 'Ok')
      alert('Failed to generate batch!');
    $("#myModal").modal('hide');
  }

}
