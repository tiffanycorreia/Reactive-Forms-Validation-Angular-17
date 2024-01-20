import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const LandingpageRouting: Routes = [
{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(LandingpageRouting),
    HomeComponent,
    RouterModule
  ],
  exports: [RouterModule]
})
export class HomeModule { }
