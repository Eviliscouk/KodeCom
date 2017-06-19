import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorsComponent } from './contractors/contractors.component';
import { ContractorStartComponent } from './contractors/contractor-start/contractor-start.component';
import { ContractorDetailComponent } from './contractors/contractor-detail/contractor-detail.component';
import { ContractorEditComponent } from './contractors/contractor-edit/contractor-edit.component';
import { SubcontractorComponent } from './subcontractor/subcontractor.component';
import { SubcontractorStartComponent } from './subcontractor/subcontractor-start/subcontractor-start.component';
import { SubcontractorDetailComponent } from './subcontractor/subcontractor-detail/subcontractor-detail.component';
import { SubcontractorEditComponent } from './subcontractor/subcontractor-edit/subcontractor-edit.component';
import { PayrollComponent } from './payroll/payroll.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contractors', pathMatch: 'full' },
  { path: 'contractors', component: ContractorsComponent, children: [
    { path: '', component: ContractorStartComponent, pathMatch: 'full' },
    { path: 'new', component: ContractorEditComponent },
    { path: ':id', component: ContractorDetailComponent },
    { path: ':id/edit', component: ContractorEditComponent },
  ]},
  { path: 'subContractors/:id', component: SubcontractorComponent, children: [
    { path: '', component: SubcontractorStartComponent, pathMatch: 'full' },
    { path: 'new', component: SubcontractorEditComponent },
    { path: ':id', component: SubcontractorDetailComponent },
    { path: ':id/edit', component: SubcontractorEditComponent },
  ]},
  { path: 'payroll/:id', component: PayrollComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }