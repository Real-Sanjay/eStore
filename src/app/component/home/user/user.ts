import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
userRegisterForm : FormGroup;
constructor(private fb: FormBuilder) {
  this.userRegisterForm = this.fb.group( {
    email: ['', String],
    address: [''],
    state : [''],
    city: [''],
    pin: [''],
    name: [''],
    password: ['']
  }
  )
}
}
