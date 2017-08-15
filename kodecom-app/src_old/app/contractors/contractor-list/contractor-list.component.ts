import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ContractorName } from './contractorName.model';
import { ContractorService } from '../contractor.service';

import { Subscription } from 'rxjs/Subscription';

import {FilterDisplayNamePipe} from '../../shared/filter-displayName.pipe';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit, OnDestroy {
  contractorNames: ContractorName[] = [];
  private contractorSub: Subscription;
  private diplayNameFilter: string;

  constructor(private contractorsService: ContractorService,
              private router: Router,
              private route: ActivatedRoute) {   
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => { this.getContractorNames()})
         
    this.contractorSub = this.contractorsService.contractorsChanged.subscribe(c => this.getContractorNames());
  }
  

  getContractorNames()  {
    this.contractorsService.getContractorNames().subscribe(c => this.contractorNames = c);
  }

  onNewContractor() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
        this.contractorSub.unsubscribe();
    }
}
