import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContractorListComponent } from './contractors/contractor-list/contractor-list.component';
import { ContractorItemComponent } from './contractors/contractor-list/contractor-item/contractor-item.component';
import { ContractorStartComponent } from './contractors/contractor-start/contractor-start.component';
import { HeaderComponent } from './header/header.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { ContractorDetailComponent } from './contractors/contractor-detail/contractor-detail.component';
import { ContractorEditComponent } from './contractors/contractor-edit/contractor-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SubcontractorComponent } from './subcontractor/subcontractor.component';
import { FilterDisplayNamePipe } from './shared/filter-displayName.pipe';
import { DataFilterPipe } from './shared/data-filter.pipe';
import { SubcontractorListComponent } from './subcontractor/subcontractor-list/subcontractor-list.component';
import { SubcontractorItemComponent } from './subcontractor/subcontractor-list/subcontractor-item/subcontractor-item.component';
import { SubcontractorDetailComponent } from './subcontractor/subcontractor-detail/subcontractor-detail.component';
import { SubcontractorEditComponent } from './subcontractor/subcontractor-edit/subcontractor-edit.component';
import { SubcontractorStartComponent } from './subcontractor/subcontractor-start/subcontractor-start.component';
import { PayrollComponent } from './payroll/payroll.component';

@NgModule({
  declarations: [
    AppComponent,
    ContractorListComponent,
    ContractorItemComponent,
    ContractorStartComponent,
    HeaderComponent,
    ContractorsComponent,
    ContractorDetailComponent,
    ContractorEditComponent,
    DropdownDirective,
    SubcontractorComponent,
    FilterDisplayNamePipe,
    SubcontractorListComponent,
    SubcontractorItemComponent,
    SubcontractorDetailComponent,
    SubcontractorEditComponent,
    SubcontractorStartComponent,
    PayrollComponent,
    DataFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
