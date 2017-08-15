import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Owner } from '../shared/owner.model';
import { OwnerService } from './owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
  providers: [OwnerService]
})
export class OwnerComponent implements OnInit {
  ownerItem: Owner;
  id: number;
  constructor(private ownerService: OwnerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
            this.ownerService.getOwner().subscribe(o => {
            this.ownerItem = o;
          });
          
        }
      );
  }

  public onEditOwner()
  {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
