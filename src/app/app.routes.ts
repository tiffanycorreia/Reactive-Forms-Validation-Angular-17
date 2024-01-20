import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctors/doctors.module').then((m) => m.DoctorsModule)
  },
  {
    path: 'viewDoc',
    loadChildren: () =>
      import('./view-doctors/view-doctors.module').then((m) => m.ViewDoctorsModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
