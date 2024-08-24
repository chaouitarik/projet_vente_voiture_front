import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  isAuthenticated : boolean=false ;
  roles : any ;
  accesToken !: string ;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getCurrentUserId(): string | null {
    const token = this.getToken();
    console.log('Token in getCurrentUserId:', token);
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      return decodedToken.userId || null;
    }
    return null;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    //console.log('AuthService: login called with', email, password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    //console.log('AuthService: request body', body); 
    return this.http.post<any>(this.apiUrl, body, { headers ,withCredentials: true})
      .pipe(map(user => {
        console.log('AuthService: login response', user);
        // Stocker les détails de l'utilisateur et le jeton jwt dans le local storage pour maintenir la session de l'utilisateur entre les actualisations
       // if (user && user.accessToken) {
        if (user && user['access-token']) {
       console.log('user',user);
       console.log('user.accessToken',user['access-token']);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate(['/ads']);
        }
        return user;
      }));
  }
  loadProfile(data :any){
    this.isAuthenticated = true ;
    this.accesToken=data['access-token'] ;
    let decodedJwt = jwtDecode(this.accesToken);
   this.roles =decodedJwt.sub ;
  }

  logout() {
    console.log('AuthService: logout called');
    this.isAuthenticated=false ;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const currentUser = this.currentUserValue;
    console.log('currentUser in getToken:', currentUser);
    if (currentUser && currentUser['access-token']) {
      return currentUser['access-token'];
    } else {
      console.log('No access-token found in currentUser');
      return null;
    }
  }
}
