import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contractor } from '../contractor.model';
import { ContractorService } from '../contractor.service';

import {FilterDisplayNamePipe} from '../../shared/filter-displayName.pipe';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {
  contractors: Contractor[];
  private diplayNameFilter: string;

  constructor(private contractorsService: ContractorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.contractors = this.contractorsService.getContractors();
  }

  onNewContractor() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
