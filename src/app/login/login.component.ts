import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    console.log('Login button clicked');
    this.authService.login(this.email, this.password).subscribe(
      data => {
        this.authService.loadProfile(data);
        //console.log('Login successful', data);
      },
      error => {
        console.error('Login error', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

}
