import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SubContractor } from '../../subcontractor/subcontractor.model';
import { SubContractorService } from '../../subcontractor/subcontractor.service';

declare var $:any;

@Component({
  selector: 'app-batch-reports-subcontractor',
  templateUrl: './batch-reports-subcontractor.component.html',
  styleUrls: ['./batch-reports-subcontractor.component.css'],
  providers: [SubContractorService]
})
export class BatchReportsSubcontractorComponent implements OnInit {

public startDate: Date;
public endDate: Date;
public yearEnd: Date;
public paymentDate: Date;

constructor(private route: ActivatedRoute, private router: Router, private subcontractorsService: SubContractorService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          var today = new Date();
          this.startDate = new Date();
          this.startDate.setMonth(today.getMonth() - 1);
          this.endDate = new Date();
          this.yearEnd = new Date();
          this.paymentDate = new Date();
        }
      );
  }

  async onRunAnnualInvoice()
  {
    var str = this.yearEnd.toLocaleDateString('en-GB').replace(/\//g, "-");
    $("#myModal").modal('show');
    var result = await this.subcontractorsService.getBatchKodeComAnnualInvoice(str);
    if (result != 'Ok')
      alert('Failed to generate batch!');
    $("#myModal").modal('hide');
  }

  async onRunMonthlyStat()
  {
    var str = new Date(this.startDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var str2 = new Date(this.endDate).toLocaleDateString('en-GB').replace(/\//g, "-");

    $("#myModal").modal('show');
    var result = await this.subcontractorsService.getBatchSubContractorMonthlyStat(str, str2);
    if (result != 'Ok')
      alert('Failed to generate batch!');
    $("#myModal").modal('hide');
  }

  async onRunInvoices()
  {
    var str = this.paymentDate.toLocaleDateString('en-GB').replace(/\//g, "-");
    $("#myModal").modal('show');
    var result = await this.subcontractorsService.getBatchInvoices(str);
    if (result != 'Ok')
      alert('Failed to generate batch!');
    $("#myModal").modal('hide');
  }

}
