import { Component, OnInit, Input } from '@angular/core';

import { Job } from '../../shared/job.model';

@Component({
  selector: 'app-contractor-job-item',
  templateUrl: './contractor-job-item.component.html',
  styleUrls: ['./contractor-job-item.component.css']
})
export class ContractorJobItemComponent implements OnInit {
@Input() contractorJob: Job;

  constructor() { }

  ngOnInit() {
  }

}
