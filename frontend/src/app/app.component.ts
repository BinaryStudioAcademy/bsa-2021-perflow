import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';


  constructor(private auth:AuthService){}
  signIn(){
    this.auth.signIn("test@test.test","123456").then(result=>{
      console.log(result);
    });
  }
}

