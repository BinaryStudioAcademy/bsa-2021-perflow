import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterDto } from 'src/app/models/auth/user-register-dto';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.sass']
})
export class UserRegistrationFormComponent implements OnInit {
  public registrationForm!: FormGroup;
  constructor() { }


  ngOnInit(): void {
    this.registrationForm = new FormGroup({
    'email': new FormControl('', [
        Validators.required,
        Validators.email
    ]),
    'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern("^(?=.*[A-Za-z])(?=.*[0-9@$!%*#?&-_])[A-Za-z0-9@$!%*#?&-_]{8,20}$")
    ]),
    'passwordConfirmation': new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern("^(?=.*[A-Za-z])(?=.*[0-9@$!%*#?&-_])[A-Za-z0-9@$!%*#?&-_]{8,20}$") 
    ]),
    'userName': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
    ])
    });
    
  }
  get email() { return this.registrationForm.get('email')!; }

  get password() { return this.registrationForm.get('password')!; }

  get userName() { return this.registrationForm.get('userName')!; }

  get passwordConfirmation() { return this.registrationForm.get('passwordConfirmation')!; }


  public onSubmit(): void{
    console.log('Emit submit');
    let newUser: UserRegisterDto = this.registrationForm.value
    this.registrationForm.reset();
  }

  public goBack(): void{
    console.log('Emit goBack');
    this.registrationForm.reset();
  }

}
