import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, ToastModule } from '@coreui/angular';

const RegisterRouting: Routes = [
  {
    path: '',
    component: RegisterComponent
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRouting),
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ModalModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class RegisterModule { }
