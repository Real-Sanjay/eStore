import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgClass],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {
  userLoginForm: FormGroup;

  /* this are to show message in front end after user clicked login */
  alertText = '';
  alertType = 0; // 0- success, 1- warning, 2- error

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private location: Location
  ) {
    this.userLoginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    if (this.userLoginForm.invalid) {
      this.alertText = 'invalid';
      this.alertType = 1;
      this.userLoginForm.markAsTouched();
      return;
    }

    const { email, password } = this.userLoginForm.value;

    this.userLoginForm.disable(); // To not get any new value till this process

    this.userService.login(email, password).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.alertText = 'Login success!';
          this.alertType = 0;
          this.userLoginForm.enable();
          this.userLoginForm.reset();
          this.userService.saveTokenInStorage({
            token: res.token,
            expires: res.user.expires,
            user: res.user.user,
          });
        } else {
          this.alertText = 'Invalid Login!';
          this.alertType = 1;
          this.userLoginForm.enable();
          return;
        }
        /* * After user successfully logged in,  will be 
        redirected to the page where they clicked login from
        *
        */
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      error: (error) => {
        console.log(error);
        this.alertText = error.message || 'Failed to register, server error!';
        this.alertType = 2;
        this.userLoginForm.enable();
      },
    });
  }
}
