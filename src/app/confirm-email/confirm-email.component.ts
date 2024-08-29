import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  message: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.confirmEmail(token);
      }
    });
  }

  confirmEmail(token: string) {
    this.http.get(`http://localhost:8080/api/auth/confirm-email?token=${token}`, { responseType: 'text' })
      .subscribe(
        response => {
          this.message = response;
        },
        error => {
          this.message = 'Erreur lors de la confirmation de l\'email';
        }
      );
  }
}
