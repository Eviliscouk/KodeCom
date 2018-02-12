import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SubContractor } from '../subcontractor.model';
import { SubContractorService } from '../subcontractor.service';
import { Job } from '../../shared/job.model';

@Component({
  selector: 'app-subcontractor-reports',
  templateUrl: './subcontractor-reports.component.html',
  styleUrls: ['./subcontractor-reports.component.css']
})
export class SubcontractorReportsComponent implements OnInit, OnDestroy {
id: number;
public startDate: Date;
public endDate: Date;
public yearEnd: Date;
public jobs : Job[];
public jobId : number = 0;
private sub: any;
contractorId: number;

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
          this.jobId = 0;
          
        }
      );

      this.sub = this.route.parent.params.subscribe(params => {
            this.contractorId = +params["id"];
            this.subcontractorsService.getContractorJobs(this.contractorId).subscribe(j => {this.jobs = j; this.jobs.unshift(new Job(0, 0,'All', 'Jobs'));});
        });
  }

  onViewSubcontractor()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onViewAnnualInvoice()
  {
    var str = new Date(this.yearEnd).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.subcontractorsService.getKodeComAnnualInvoice(this.id, str, this.jobId);
  }

  async onEmailAnnualInvoice()
  {
    var str = new Date(this.yearEnd).toLocaleDateString('en-GB').replace(/\//g, "-");
    var result = await this.subcontractorsService.emailKodeComAnnualInvoice(this.id, str, this.jobId);

    if (result == 'ok')
      alert('Annual Invoice Email Sent!');
    else
      alert('Error Sending Annual Invoice!');
  }

  onViewMonthlyStat()
  {
    var str = new Date(this.startDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var str2 = new Date(this.endDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.subcontractorsService.getSubContractorMonthlyStat(this.id, str, str2, this.jobId);
  }

  async onEmailMonthlyStat()
  {
    var str = new Date(this.startDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var str2 = new Date(this.endDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var result = await this.subcontractorsService.emailSubContractorMonthlyStat(this.id, str, str2, this.jobId);

    if (result == 'ok')
      alert('Monthly Statement Email Sent!');
    else
      alert('Error Sending Monthly Statement!');
  }

  ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
