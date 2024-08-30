import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from './models/ad.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdService {
  private  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private apiUrl = 'http://localhost:8080/api/ads'; 
  private apiUrlads = 'http://localhost:8080/api/ads/allAds'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAdsByUser(userId: string): Observable<any[]> {
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    console.log('headers',headers);
    return this.http.get<Ad[]>(`${this.apiUrl}/user/${userId}`,{headers});
  }
  getAds(): Observable<Ad[]> {
    
    return this.http.get<Ad[]>(this.apiUrlads);
  }

  searchAds(query: string): Observable<Ad[]> {
    const url = `${this.apiUrl}/search?q=${encodeURIComponent(query)}`;
    return this.http.get<Ad[]>(url);
  }
  
  getImage(adId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ads/${adId}/image`, { responseType: 'blob' });
  }
  deleteAd(adId: number): Observable<void> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });
  return this.http.delete<void>(`${this.apiUrl}/${adId}`, { headers });
}


  getAd(id: number): Observable<Ad> {
    return this.http.get<Ad>(`${this.apiUrl}/${id}`);
  }
  
  createAd(adData: FormData,headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(this.apiUrl, adData, { headers });
  }

  getImages(adId: number): Observable<Blob[]> {
    return this.http.get<Blob[]>(`${this.apiUrl}/${adId}/images`);
}

}
