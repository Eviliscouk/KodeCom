import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SubContractor } from '../../subcontractor/subcontractor.model';
import { SubContractorService } from '../../subcontractor/subcontractor.service';
import { Job } from '../../shared/job.model';

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
public jobs : Job[];
public jobIds : number[] = [];

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
          this.subcontractorsService.getContractorJobs(0).subscribe(j => {this.jobs = j; this.jobs.unshift(new Job(0, 0,'All', 'Jobs')); this.jobIds = []; this.jobIds.push(0);});
        }
      );
  }

  showModal()
  {
    $('#myModalText').text("Processing Request");
    $("#myModal").modal('show');
  }

  updateModalText(text :string)
  {
     $('#myModalText').text(text);
  }

  closeModal()
  {
    $("#myModal").modal('hide');
  }

  async onRunAnnualInvoice()
  {
    if (this.jobIds.indexOf(0) > -1)
      this.jobIds = [0];

    var str = new Date(this.yearEnd).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.showModal();
    var result = await this.subcontractorsService.getBatchKodeComAnnualInvoice(str, JSON.stringify(this.jobIds));
    if (result == 'Ok')
      this.updateModalText("Batch request accepted please check the Batches list for progress!");
    else
      this.updateModalText("Error submitting Batch request!");

    setTimeout(()=>{ this.closeModal() }, 1000);
  }

  async onRunMonthlyStat()
  {
    if (this.jobIds.indexOf(0) > -1)
      this.jobIds = [0];

    var str = new Date(this.startDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    var str2 = new Date(this.endDate).toLocaleDateString('en-GB').replace(/\//g, "-");

    this.showModal();
    var result = await this.subcontractorsService.getBatchSubContractorMonthlyStat(str, str2, JSON.stringify(this.jobIds));
    if (result == 'Ok')
      this.updateModalText("Batch request accepted please check the Batches list for progress!");
    else
      this.updateModalText("Error submitting Batch request!");

    setTimeout(()=>{ this.closeModal() }, 1000);
  }

  async onRunInvoices()
  {
    if (this.jobIds.indexOf(0) > -1)
      this.jobIds = [0];

    var str = new Date(this.paymentDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.showModal();
    var result = await this.subcontractorsService.getBatchInvoices(str, JSON.stringify(this.jobIds));
    if (result == 'Ok')
      this.updateModalText("Batch request accepted please check the Batches list for progress!");
    else
      this.updateModalText("Error submitting Batch request!");

    setTimeout(()=>{ this.closeModal() }, 1000);
  }

}
