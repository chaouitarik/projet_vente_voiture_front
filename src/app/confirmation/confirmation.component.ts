import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  message: string = "Votre compte a été créé avec succès ! Veuillez vérifier votre email pour confirmer votre compte.";
}
