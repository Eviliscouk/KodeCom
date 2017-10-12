import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Owner } from '../../shared/owner.model';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css'],
  providers: [OwnerService]
})
export class OwnerEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editedItemId: number = 0;
  saveSuccess: boolean;
  recordError: boolean;
  message: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) { }

  ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
        }
      );
  }

  ngAfterViewInit(){
    this.ownerService.getOwner().subscribe(o => {
            this.editedItemId = o.id;
            this.editForm.setValue({ 
             owner_name: o.owner_name,
             address: o.address,
             town: o.town,
             county: o.county,
             postcode: o.postcode,
             country: o.country,
             telUK: o.telUK,
             faxUK: o.faxUK,
             telOverseas: o.telOverseas,
             faxOverseas: o.faxOverseas    
           });});
  }

  async onSubmit(form: NgForm) {
    form.value.id = this.editedItemId;
    var result = await this.ownerService.updateOwner(JSON.stringify(form.value));
    if (result == 'ok')
    {
      this.saveSuccess= true;
      this.recordError= false;
      
      this.message = "Record Updated";
      
      form.reset();

      this.NavigateToOwner();
    }
  }

  onClear() {
    this.editForm.reset();
  }

  NavigateToOwner(){
    setTimeout(()=>{ this.saveSuccess = false; this.router.navigate(['../../owner'], {relativeTo: this.route}) }, 1000)
  }

  ngOnDestroy() {

  }

}
