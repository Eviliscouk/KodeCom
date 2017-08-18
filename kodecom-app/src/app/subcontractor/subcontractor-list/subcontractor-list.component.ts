import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SubContractorName } from './subcontractorName.model';
import { SubContractorService } from '../subcontractor.service';

import { Subscription } from 'rxjs/Subscription';

import {FilterDisplayNamePipe} from '../../shared/filter-displayName.pipe';

@Component({
  selector: 'app-subcontractor-list',
  templateUrl: './subcontractor-list.component.html',
  styleUrls: ['./subcontractor-list.component.css']
})
export class SubcontractorListComponent implements OnInit {
  id: number;
  subcontractorNames: SubContractorName[] = [];
  private subContractorSub: Subscription;
  public diplayNameFilter: string = "";

  constructor(private subcontractorsService: SubContractorService,
              private router: Router,
              private route: ActivatedRoute) {
              }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.getSubContractorNames();
        }
      );

      this.subContractorSub = this.subcontractorsService.subContractorsChanged.subscribe(s => this.getSubContractorNames());
  }

  getSubContractorNames()  {
    this.subcontractorsService.getSubContractorNames(this.id, 2).subscribe(s => {this.subcontractorNames = s;});
  }

  onNewSubContractor() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
        this.subContractorSub.unsubscribe();
    }

}
