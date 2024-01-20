import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DoctorsService } from '../doctors.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  template: '<router-outlet></router-outlet>',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  submitted = false;
  value: number = 500;
  unsuccessFlag: any;
  consultationFee: number = 0;
  type: any;
  message: any;

  get f(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  registrationForm: FormGroup = new FormGroup({
    mobile: new FormControl(''),
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    graduation: new FormControl(''),
    degree1: new FormControl(''),
    degree2: new FormControl(''),
    onlineConsultantFee: new FormControl(''),
    inPersonConsultantFee: new FormControl('')
  });

  constructor(private docService: DoctorsService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private CurrencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validateEmail]],
      mobile: ['', [Validators.required, this.validateMobile]],
      fullName: ['', [Validators.required, this.validateFullName]],
      password: ['', [Validators.required, this.validatePassword]],
      confirmPassword: ['', [Validators.required, this.validateConfirmPassword]],
      graduation: ['', [Validators.required]],
      degree1: ['', [Validators.required]],
      degree2: ['', [Validators.required]],
      onlineConsultantFee: ['', [Validators.required]],
      inPersonConsultantFee: ['', [Validators.required]],
      additionalDegrees: this.formBuilder.array([])
    });
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });

    this.registrationForm.valueChanges.subscribe(form => {
      if (form.onlineConsultantFee) {
        this.registrationForm.patchValue({
          onlineConsultantFee: this.CurrencyPipe.transform(form.onlineConsultantFee.replace(/\D/g, '').replace(/^0+/, ''), 'INR', 'symbol', '1.0-0')
        }, { emitEvent: false });
      }
    });

    this.registrationForm.valueChanges.subscribe(form => {
      if (form.inPersonConsultantFee) {
        this.registrationForm.patchValue({
          inPersonConsultantFee: this.CurrencyPipe.transform(form.inPersonConsultantFee.replace(/\D/g, '').replace(/^0+/, ''), 'INR', 'symbol', '1.0-0')
        }, { emitEvent: false });
      }
    });
  }

  match(controlName: string, matchingControlName: string) {
    (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ match: true });
        return { match: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }

  validateMobile(control: AbstractControl): ValidationErrors | null {
    const mobileNumber = control.value;
    if (mobileNumber && mobileNumber.length === 10) {
      return null;
    } else {
      return { 'invalidMobile': true };
    }
  }

  validateFullName(control: AbstractControl): ValidationErrors | null {
    const fullName = control.value;
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    if (fullName && fullNameRegex.test(fullName)) {
      return null;
    } else {
      return { 'invalidFullName': true };
    }
  }

  validateConfirmPassword(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const passwordControl = control.parent?.get('password');

    if (passwordControl && confirmPassword === passwordControl.value) {
      return null;
    } else {
      return { 'passwordMismatch': true };
    }
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const minLength = 8;

    if (password && password.length >= minLength) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email && emailRegex.test(email)) {
      return null;
    } else {
      return { 'invalidEmail': true };
    }
  }

  get additionalDegreesArray() {
    return this.registrationForm.get('additionalDegrees') as FormArray;
  }

  addDegree() {
    const newDegree = this.formBuilder.group({
      additionalDegree: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.additionalDegreesArray.push(newDegree);
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get onlineConsultantFee() {
    return this.registrationForm.get('onlineConsultantFee');
  }

  get additionalDegrees(): FormArray {
    return this.registrationForm.get('additionalDegrees') as FormArray;
  }

  createDegreeFormGroup(): FormGroup {
    return this.formBuilder.group({
      additionalDegree: ['', Validators.required]
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
  }

  onRegisterClick() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.docService.addDoctor(formData);
      this.router.navigate(['/viewDoc']);
    } else {
      console.log('Error!');
    }
  }

}
