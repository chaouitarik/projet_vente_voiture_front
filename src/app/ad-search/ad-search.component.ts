import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AdService } from '../ad.service';
import { Ad } from '../models/ad.model';

@Component({
  selector: 'app-ad-search',
  templateUrl: './ad-search.component.html',
  styleUrls: ['./ad-search.component.css']
})
export class AdSearchComponent implements OnInit {
  query: string = '';
  ads: Ad[] = [];

  constructor(private route: ActivatedRoute, private adService: AdService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.searchAds();
    });
  }

  searchAds(): void {
    console.log("query",this.query);
    if (this.query) {
      this.adService.searchAds(this.query).subscribe(
        (ads) => {
          this.ads = ads;
          this.ads.forEach(ad => this.loadImage(ad));
        },
        (error) => {
          console.error('Erreur lors de la recherche des annonces', error);
        }
      );
    }
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