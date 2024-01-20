import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule, ModalModule, ToastModule } from '@coreui/angular';
import { RegistrationDataService } from './registration-data.service';
import { DoctorsModule } from './doctors/doctors.module';

@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DoctorsModule,
    RouterModule,
    CommonModule,
    ToastModule,
    ModalModule,
    ButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [RegistrationDataService]
})
export class AppModule {
}
