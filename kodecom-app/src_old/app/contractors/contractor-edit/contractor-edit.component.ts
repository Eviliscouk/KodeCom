import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Contractor } from '../contractor.model';
import { ContractorService } from '../contractor.service';

@Component({
  selector: 'app-contractor-edit',
  templateUrl: './contractor-edit.component.html',
  styleUrls: ['./contractor-edit.component.css']
})
export class ContractorEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemId: number = 0;
  saveSuccess: boolean;
  recordError: boolean;
  message: string = "";
  
  public payerTypes = [
    { value: 'Gross Payer', display: 'Gross Payer' },
    { value: 'Net Payer', display: 'Net Payer' }
];

  constructor(private route: ActivatedRoute, private router: Router, private contractorsService: ContractorService) { }

  ngOnInit() {
      this.route.params
      .subscribe(
        (params: Params) => {
          this.editedItemId = +params['id'];
        }
      );
  }
  
  ngAfterViewInit(){
    if (this.editedItemId)
          {
            this.editMode = true;
            this.contractorsService.getContractor(this.editedItemId).subscribe(c => {
              
              this.editForm.setValue({ 
             companyName: c.companyName,
             firstName: c.firstName,
             surname: c.surname,
             address: c.address,
             town: c.town,
             county: c.county,
             postcode: c.postcode,
             phone: c.phone,
             mobPhone: c.mobPhone,
             fax: c.mobPhone,
             email: c.email,
             utr: c.utr,
             fee: c.fee,
             tlcIns: c.tlcIns,
             payerType: c.payerType,
           });});
          }
          else
          {
            this.editMode = false;
          }
  }
  
  async onSubmit(form: NgForm) {
    form.value.id = this.editedItemId;
    var result = await this.contractorsService.updateContractor(JSON.stringify(form.value));
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

      this.NavigateToContractor();
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
    var result = await this.contractorsService.deleteContractor(this.editedItemId);

    if (result == 'ok')
    {
      this.saveSuccess= true;
      this.recordError= false;
      this.message = "Record Deleted";
      this.onClear();

      this.NavigateToContractor();  
    }
    else
    {
      this.message = "Deletion Failed";
      this.recordError= true;
    }
  }

  NavigateToContractor(){
    setTimeout(()=>{ this.saveSuccess = false; this.router.navigate(['../../../contractors/'], {relativeTo: this.route}) }, 1000)
  }

  ngOnDestroy() {

  }

}
