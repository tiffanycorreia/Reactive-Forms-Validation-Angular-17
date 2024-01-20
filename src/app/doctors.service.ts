import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private doctors: any[] = [];

  constructor() {
    this.loadDoctorsFromStorage();
  }

  addDoctor(doctor: any): void {
    this.doctors.push(doctor);
    this.saveDoctorsToStorage();
  }

  getAllDoctors(): any[] {
    return this.doctors;
  }

  private loadDoctorsFromStorage(): void {
    const storedData = localStorage.getItem('doctors');
    this.doctors = storedData ? JSON.parse(storedData) : [];
  }

  private saveDoctorsToStorage(): void {
    localStorage.setItem('doctors', JSON.stringify(this.doctors));
  }
}
