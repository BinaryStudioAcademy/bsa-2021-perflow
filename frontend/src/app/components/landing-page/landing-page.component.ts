import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  showPassword: boolean = false;
  isSignUpClicked: boolean = false;
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9@._\-]*$")])
  });

  constructor() { 
    this.loginForm.valueChanges.subscribe( changes => {
      this.isSignUpClicked = false;
    })
   }

  ngOnInit(): void {
  }

  signUpOnClick()
  {
    this.isSignUpClicked = true;
  }

  toggleShowPassword() : void{
    this.showPassword = !this.showPassword;
  }
}