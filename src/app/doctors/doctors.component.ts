import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DoctorsService } from '../doctors.service';
import { ButtonModule, ModalModule, ToastModule } from '@coreui/angular';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterOutlet, ModalModule, ToastModule, ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<router-outlet></router-outlet>',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorComponents implements OnInit {
    doctors: any[] = [];
    deleteFlag: any;
    type: any;
    message: any;
    @Input() doctor: any[] = [];
    @Output() deleteDoctor = new EventEmitter<[]>();

  constructor(private doctorService: DoctorsService) {}

  ngOnInit(): void {
    this.doctors = this.doctorService.getAllDoctors();
    this.loadDoctors();
  }

  onDeleteDoctor(doctor: any): void {
    this.doctors = this.doctors.filter(d => d.email !== doctor.email);
    this.saveDoctorsToStorage(this.doctors as []);
    this.deleteFlag = true;
    this.type = 'success';
    this.message = 'Deleted Successfully!';
    setTimeout(() => {
      this.deleteFlag = false
      this.message = ''
    }, 2000);
  }

  private saveDoctorsToStorage(doctors: []): void {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }
  
  private loadDoctors(): void {
    const storedData = localStorage.getItem('doctors');
  
    if (storedData) {
      this.doctors = JSON.parse(storedData);
    }
  }
}
