import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SubContractor } from '../subcontractor.model';
import { SubContractorService } from '../subcontractor.service';

@Component({
  selector: 'app-subcontractor-reports',
  templateUrl: './subcontractor-reports.component.html',
  styleUrls: ['./subcontractor-reports.component.css']
})
export class SubcontractorReportsComponent implements OnInit {
id: number;
public startDate: Date;
public endDate: Date;
public yearEnd: Date;
  constructor(private route: ActivatedRoute, private router: Router, private subcontractorsService: SubContractorService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          var today = new Date();
          this.startDate = new Date();
          this.startDate.setMonth(today.getMonth() - 1);
          this.endDate = new Date();
          this.yearEnd = new Date();
        }
      );
  }

  onViewSubcontractor()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewAnnualInvoice()
  {
    var str = this.yearEnd.toLocaleDateString('en-GB').replace(/\//g, "-");
    this.subcontractorsService.getKodeComAnnualInvoice(this.id, str);
  }

  async onEmailAnnualInvoice()
  {
    var str = this.yearEnd.toLocaleDateString('en-GB').replace(/\//g, "-");
    var result = await this.subcontractorsService.emailKodeComAnnualInvoice(this.id, str);

    if (result == 'ok')
      alert('Annual Invoice Email Sent!');
    else
      alert('Error Sending Annual Invoice!');
  }

  onViewMonthlyStat()
  {
    var str = new Date(this.startDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var str2 = new Date(this.endDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.subcontractorsService.getSubContractorMonthlyStat(this.id, str, str2);
  }

  async onEmailMonthlyStat()
  {
    var str = new Date(this.startDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var str2 = new Date(this.endDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var result = await this.subcontractorsService.emailSubContractorMonthlyStat(this.id, str, str2);

    if (result == 'ok')
      alert('Monthly Statement Email Sent!');
    else
      alert('Error Sending Monthly Statement!');
  }

}
