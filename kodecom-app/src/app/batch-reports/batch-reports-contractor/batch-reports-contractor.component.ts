import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Contractor } from '../../contractors/contractor.model';
import { ContractorService } from '../../contractors/contractor.service';
import { Job } from '../../shared/job.model';

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
public jobs : Job[];
public jobIds : number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private contractorsService: ContractorService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.paymentDate = new Date();
          this.monthEnd = new Date();
          this.fromDate = new Date();
          this.toDate = new Date();
          this.contractorsService.getContractorJobs(0).subscribe(j => {this.jobs = j; this.jobs.unshift(new Job(0, 0,'All', 'Jobs')); this.jobIds = []; this.jobIds.push(0);});
        }
      );
  }

  showModal()
  {
    $('#myModalText').text("Processing Request");
    $("#myModal").modal('show');
  }

  closeModal()
  {
    $("#myModal").modal('hide');
  }

  updateModalText(text :string)
  {
     $('#myModalText').text(text);
  }

  async onRunWeeklyRemittance()
  {
    if (this.jobIds.indexOf(0) > -1)
      this.jobIds = [0];
    
    var str = new Date(this.paymentDate).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.showModal();
    var result = await this.contractorsService.getBatchContractorWeeklyRemittance(str, JSON.stringify(this.jobIds));
    if (result == 'Ok')
      this.updateModalText("Batch request accepted please check the Batches list for progress!");
    else
      this.updateModalText("Error submitting Batch request!");

    setTimeout(()=>{ this.closeModal() }, 1000);
    
  }

  async onRunMonthlyReturn()
  {
    if (this.jobIds.indexOf(0) > -1)
      this.jobIds = [0];

    //$("#myModal").modal('show');
    var str = new Date(this.monthEnd).toLocaleDateString('en-GB').replace(/\//g, "-");
    this.showModal();
    var result = await this.contractorsService.getBatchContractorMonthlyReturn(str, JSON.stringify(this.jobIds));
    if (result == 'Ok')
        this.updateModalText("Batch request accepted please check the Batches list for progress!");
    else
      this.updateModalText("Error submitting Batch request!");

    setTimeout(()=>{ this.closeModal() }, 1000);
  }

}
