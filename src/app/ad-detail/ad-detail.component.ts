import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../ad.service';
import { Ad } from '../models/ad.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  ad: Ad | undefined;

  constructor(private route: ActivatedRoute,private adService: AdService,public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAdDetails();
  }
  openWhatsApp() {
    window.open('https://wa.me/YOUR_PHONE_NUMBER', '_blank');
  }

  getAdDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.adService.getAd(id).subscribe(
      (ad) => {
        this.ad = ad;
        this.loadImage(ad);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'annonce', error);
      }
    );
  }

  loadImage(ad: Ad): void {
    this.adService.getImage(ad.id).subscribe(
      (blob) => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          ad.imageSrc = reader.result as string;
        };
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'image', error);
      }
    );
  }
}
