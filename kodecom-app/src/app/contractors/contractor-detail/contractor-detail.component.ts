import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contractor } from '../contractor.model';
import { ContractorService } from '../contractor.service';

@Component({
  selector: 'app-contractor-detail',
  templateUrl: './contractor-detail.component.html',
  styleUrls: ['./contractor-detail.component.css']
})
export class ContractorDetailComponent implements OnInit {
  contractor: Contractor;
  id: number;

  constructor(private contractorsService: ContractorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contractor = this.contractorsService.getContractor(this.id);
        }
      );
  }

  onEditContractor() {
    
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  
  onViewSubcontractors(){
    this.router.navigate(['../../subContractors/', this.contractor.c_ID], {relativeTo: this.route});
  }
}
