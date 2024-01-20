import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {
  private registrationData: any;

  setRegistrationData(data: any): void {
    this.registrationData = data;
  }

  getRegistrationData(): any {
    this.registrationData;
  }
}