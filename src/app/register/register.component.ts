import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  phoneNumber:Number | undefined ;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    };

    this.userService.register(userData).subscribe(
      response => {
        console.log('Utilisateur créé avec succès!', response);
        //this.router.navigate(['/login']);
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur', error);
      }
    );
  }
}
