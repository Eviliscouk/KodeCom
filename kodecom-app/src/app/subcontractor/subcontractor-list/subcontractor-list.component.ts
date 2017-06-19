import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SubContractor } from '../subcontractor.model';
import { SubContractorService } from '../subcontractor.service';

import {FilterDisplayNamePipe} from '../../shared/filter-displayName.pipe';

@Component({
  selector: 'app-subcontractor-list',
  templateUrl: './subcontractor-list.component.html',
  styleUrls: ['./subcontractor-list.component.css']
})
export class SubcontractorListComponent implements OnInit {
  id: number;
  subcontractors: SubContractor[];
  private diplayNameFilter: string;

  constructor(private subcontractorsService: SubContractorService,
              private router: Router,
              private route: ActivatedRoute) {
              }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.subcontractors = this.subcontractorsService.getSubContractors(this.id);
        }
      );
  }

  onNewSubContractor() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
