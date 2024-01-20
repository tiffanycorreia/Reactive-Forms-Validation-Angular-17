import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDoctorsComponent } from './view-doctors.component';
import { RouterModule, Routes } from '@angular/router';

const ViewRouting: Routes = [
  {
    path: '',
    component: ViewDoctorsComponent
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ViewRouting)
  ]
})
export class ViewDoctorsModule { }
