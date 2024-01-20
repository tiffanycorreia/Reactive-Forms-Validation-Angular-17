import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponents } from './doctors.component';
import { ButtonModule, ModalModule, ToastModule } from '@coreui/angular';

const DocRouting: Routes = [
  {
    path: '',
    component: DoctorComponents
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(DocRouting),
    ButtonModule,
    ToastModule,
    ModalModule
  ]
})
export class DoctorsModule { }
