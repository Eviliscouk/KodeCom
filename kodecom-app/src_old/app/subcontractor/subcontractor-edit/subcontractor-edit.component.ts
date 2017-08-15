import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { SubContractor } from '../subcontractor.model';
import { SubContractorService } from '../subcontractor.service';

@Component({
  selector: 'app-subcontractor-edit',
  templateUrl: './subcontractor-edit.component.html',
  styleUrls: ['./subcontractor-edit.component.css']
})
export class SubcontractorEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  contractorId: number;
  saveSuccess: boolean;
  recordError: boolean;
  message: string = "";
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private subcontractorsService: SubContractorService) { }

  ngOnInit() {
      
      this.route.params
      .subscribe(
        (params: Params) => {
          this.editedItemId = +params['id'];
        }
      );

      this.sub = this.route.parent.params.subscribe(params => {
            this.contractorId = +params["id"];
        });
  }
  
  ngAfterViewInit(){
          if (this.editedItemId)
          {
            this.editMode = true;
            this.subcontractorsService.getSubContractor(this.editedItemId).subscribe(s => {
              
              this.editForm.setValue({
             companyName: s.companyName,
             firstName: s.firstName,
             surname: s.surname,
             address: s.address,
             town: s.town,
             county: s.county,
             postcode: s.postcode,
             phone: s.phone,
             mobPhone: s.mobPhone,
             fax: s.mobPhone,
             email: s.email,
             utr: s.utr,
             nino: s.nino,
             verificationNo: s.verificationNo,
             deductionRate: s.deductionRate,
             vatRate: s.vatRate,
             services: s.services,
             active: s.active,
             contractRecd: s.contractRecd,
           });});
          }
          else
          {
            this.editMode = false;
          }
       }
  
  async onSubmit(form: NgForm) {
    form.value.id = this.editedItemId;
    form.value.cid = this.contractorId;

    if (form.value.active === true)
        form.value.active = 1;
    else if (form.value.active === false)
        form.value.active = 0;

    if (form.value.contractRecd === true)
        form.value.contractRecd = 1;
    else if (form.value.contractRecd === false)
        form.value.contractRecd = 0;

    var result = await this.subcontractorsService.updateSubContractor(JSON.stringify(form.value));
    if (result == 'ok')
    {
      this.saveSuccess= true;
      this.recordError= false;

      if (this.editMode)
        this.message = "Record Updated";
      else
        this.message = "Record Created";
      
      this.editMode = false;
      form.reset();

      this.NavigateToSubContractor();
    }
    else
    {
      this.message = "Record Failure";
      this.recordError= true;
    }
  }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  async onDelete() {
    var result = await this.subcontractorsService.deleteSubContractor(this.editedItemId);

    if (result == 'ok')
    {
      this.saveSuccess= true;
      this.recordError= false;
      this.message = "Record Deleted";
      this.onClear();

      this.NavigateToSubContractor();  
    }
    else
    {
      this.message = "Deletion Failed";
      this.recordError= true;
    }
  }

  NavigateToSubContractor(){
    setTimeout(()=>{ this.saveSuccess = false; this.router.navigate(['../../../', this.contractorId], {relativeTo: this.route}) }, 1000)
  }

  ngOnDestroy() {
        this.sub.unsubscribe();
    }

}