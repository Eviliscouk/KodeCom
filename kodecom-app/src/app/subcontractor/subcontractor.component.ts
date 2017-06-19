import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ContractorService } from '../contractors/contractor.service';
import { SubContractorService } from '../subcontractor/subcontractor.service';

@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.component.html',
  styleUrls: ['./subcontractor.component.css'],
  providers: [ContractorService, SubContractorService]
})
export class SubcontractorComponent implements OnInit {
  id: number;
  contractorName: string;
  
  constructor(private contractorsService: ContractorService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contractorName = this.contractorsService.getContractorName(this.id);
        }
      );
  }
  
  onViewContractor(){
    this.router.navigate(['../../contractors/', this.id], {relativeTo: this.route});
  }

}
