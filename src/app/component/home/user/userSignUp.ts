import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { passwordMatchValidator } from './Validators/passwordMacthValidator';
import { UserService } from './service/user.service';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { response } from 'express';
import { error } from 'console';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './userSignUp.html',
  styleUrl: './userSignUp.css',
  providers: [UserService]
})
export class UserSignUp {
  userRegisterForm: FormGroup;
  alertMessage : string = '';
  alertType : number = 0 // 0-> success, 1-> warning, 2-> error

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userRegisterForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        state: [''],
        city: [''],
        pin: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        phoneNo: ['', [Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: passwordMatchValidator(),
      }
    );
  }

  // Getters for validation in templates
  get email(): AbstractControl<any, any> | null {
    return this.userRegisterForm.get('email');
  }
  get address(): AbstractControl<any, any> | null {
    return this.userRegisterForm.get('address');
  }
  get name(): AbstractControl<any, any> | null {
    return this.userRegisterForm.get('name');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userRegisterForm.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userRegisterForm.get('confirmPassword');
  }

  onFormSubmit(): void {
    // Guard clause
    if (this.userRegisterForm.invalid) {
      this.alertMessage = 'please fill all the fields as expected';
      this.alertType = 1;
      this.userRegisterForm.markAllAsTouched();
      return;
    }

    const {
      email,
      name,
      address,
      state,
      city,
      pin,
      phoneNo: phone_no,
      password,
    } = this.userRegisterForm.value;

    // Will send this user data to save as new user to server
    const newUser : User= {
      email,
      name,
      address,
      state,
      city,
      pin,
      phone_no,
      password,
    };

    // To avoid duplicate entry
    this.userRegisterForm.disable();

    this.userService.createUser(newUser).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.alertMessage = 'Registered successfully';
          this.alertType = 0;
          this.userRegisterForm.enable();
          this.userRegisterForm.reset();
        } else if ((response.message = 'email already registered')) {
          this.alertMessage = response.message;
          this.alertType = 1;
        }
      },
      error: (error) => {
        console.log(error);
        this.alertMessage = error.message || 'Failed to register, server error!';
        this.alertType = 2;

      },
    });
  }
}
