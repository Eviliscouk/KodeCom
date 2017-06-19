import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SubContractor } from '../subcontractor.model';
import { SubContractorService } from '../subcontractor.service';
@Component({
  selector: 'app-subcontractor-detail',
  templateUrl: './subcontractor-detail.component.html',
  styleUrls: ['./subcontractor-detail.component.css']
})
export class SubcontractorDetailComponent implements OnInit {
  subcontractor: SubContractor;
  id: number;

  constructor(private subcontractorsService: SubContractorService,
              private route: ActivatedRoute,
              private router: Router) {
                }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.subcontractor = this.subcontractorsService.getSubContractor(this.id);
        }
      );
  }
  
  onEditSubContractor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  
  onViewPayroll(){
    //this.router.navigate(['../../payroll/', this.subcontractor.s_ID], {relativeTo: this.route});
    this.router.navigate(['../../../payroll/', this.id], {relativeTo: this.route});
  }

}
