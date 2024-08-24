import { Component, OnInit } from '@angular/core';
import { AdService } from '../ad.service';
import { Ad } from '../models/ad.model';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import * as moment from 'moment';
interface ModelDictionary {
  [key: string]: string[];
}
@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: Ad[] = [];
  filteredAds: any[] = [];
 

  // Filtres
  selectedBrand: string | undefined;
  selectedModel: string | undefined;
  selectedYear: string = '';
  selectedTransmission: string = '';
  selectedEnergy: string = '';
  model: string = '';
  models: string[] = []; 
  years: string[] = ['2024', '2023', '2022', '2021'];
  transmissions: string[] = ['Manuelle', 'Automatique', 'Semi-automatique'];
  fuelTypes: string[] = ['Essence', 'Diesel', 'Hybride', 'Electrique', 'GPL', 'Gaz naturel (CNG)', 'Autre'];

 
  brands: string[] = [ 'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti',
    'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën', 'Dacia', 'Daewoo', 
    'Daihatsu', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda', 
    'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'Kia', 
    'Koenigsegg', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lincoln', 
    'Lotus', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz', 
    'MG', 'Mini', 'Mitsubishi', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 
    'Porsche', 'Ram', 'Renault', 'Rolls-Royce', 'Saab', 'SEAT', 'Skoda', 
    'Smart', 'Subaru', 'Suzuki', 'Tata', 'Tesla', 'Toyota', 'Volkswagen', 
    'Volvo', 'Yugo', 'Rivian', 'Lucid', 'Polestar', 'Fisker', 'Cupra', 
    'Datsun', 'Chery', 'Geely', 'Great Wall', 'Haval', 'JAC', 'MG (Morris Garages)', 
    'Mahindra', 'Maruti Suzuki', 'Proton', 'Perodua', 'Scion', 'SsangYong', 
    'Vauxhall', 'Wiesmann', 'Zagato']; 
    allModels: ModelDictionary = {
      'Land Rover':['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Freelander', 'Defender 90',  'Defender 110', 
  'Defender 130',  'Range Rover Classic',  'Range Rover L322',  'Range Rover L405',  'Range Rover P38',  'Range Rover Vogue',  'Range Rover Autobiography',  'Range Rover SVAutobiography', 'Range Rover Evoque Convertible'],
      'Mercedes-Benz': [ 'Classe A', 'Classe B', 'Classe C', 'Classe E', 'Classe S', 
        'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'Classe G', 
        'EQC', 'EQB', 'EQA', 'EQS', 'EQV', 'AMG GT', 'AMG A 35', 
        'AMG A 45', 'AMG C 43', 'AMG C 63', 'AMG E 53', 'AMG E 63', 
        'AMG GLC 43', 'AMG GLC 63', 'AMG GLE 53', 'AMG GLE 63', 
        'AMG GLS 63', 'AMG G 63', 'AMG GT 4-Portes', 'AMG S 63', 
        'AMG S 65', 'Classe V', 'Vito', 'Sprinter', 'Classe X'],
      'BMW': ['Série 1', 'Série 2', 'Série 2 Gran Coupé', 'Série 2 Active Tourer', 
        'Série 3', 'Série 3 Gran Turismo', 'Série 4', 'Série 4 Gran Coupé', 
        'Série 5', 'Série 5 Gran Turismo', 'Série 6', 'Série 6 Gran Turismo', 
        'Série 7', 'Série 8', 'Série 8 Gran Coupé', 'X1', 'X2', 'X3', 'X4', 
        'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX', 'iX3', 'i8', 
        'M2', 'M3', 'M4', 'M5', 'M6', 'M8', 'X3 M', 'X4 M', 'X5 M', 
        'X6 M', 'Z4 M40i', 'Alpina B7', 'Alpina B8', 'Alpina XB7'],
      'Audi': [ 'A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 
        'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 
        'TT', 'TT Roadster', 'R8', 'R8 Spyder', 
        'e-tron', 'e-tron GT', 'RS3', 'RS4 Avant', 'RS5', 
        'RS6 Avant', 'RS7', 'RS Q3', 'RS Q8', 
        'S1', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 
        'SQ2', 'SQ5', 'SQ7', 'SQ8', 'Allroad', 'Avant'],
      'Toyota': ['Aygo', 'Yaris', 'Yaris Cross', 'Corolla', 'Corolla Touring Sports', 
    'Corolla Sedan', 'Camry', 'Avensis', 'Prius', 'Prius+',
    'Mirai', 'C-HR', 'RAV4', 'Highlander', 'Land Cruiser', 
    'Hilux', 'Proace', 'Proace City', 'Proace Verso', 
    'Supra', 'GT86', 'GR86', 'GR Yaris', 'GR Corolla',
    'Verso', 'Verso-S', 'Sienna', 'Venza', 'Tacoma', 
    'Tundra', 'Sequoia', '4Runner', 'Fortuner'],
      'Volkswagen' :['Polo', 'Golf', 'Golf GTI', 'Golf R', 'Passat', 
    'Arteon', 'Jetta', 'T-Roc', 'T-Cross', 'Tiguan', 
    'Tiguan Allspace', 'Touareg', 'ID.3', 'ID.4', 
    'ID. Buzz', 'ID.5', 'Beetle', 'Scirocco', 
    'Touran', 'Sharan', 'Caddy', 'Multivan', 
    'Amarok', 'Transporter', 'California', 
    'Crafter', 'Phaeton']
    };

  energies: string[] = ['Electrique', 'Hybride', 'Essence', 'Diesel'];

  cities: string[] = ['Ville 1', 'Ville 2']; // Remplacez par les vraies villes

  constructor(private adService: AdService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAds();
  }
  loadImage(ad: Ad): void {
    this.adService.getImage(ad.id).subscribe(
      (blob) => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          ad.imageSrc = reader.result as string; // Utiliser cette URL dans le template
        };
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'image', error);
      }
    );
  }
  calculateTimeAgo(ad: Ad): string {
    const time = ad.postedDate; // Assurez-vous que createdDate est bien défini
    if (!time) {
        return 'Date non disponible';
    }
    const now = new Date();
    const adTime = new Date(time);
    const diff = Math.abs(now.getTime() - adTime.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return `${diffDays} jours`;
}
applyFilters(): void {
  this.filteredAds = this.ads.filter(ad => {
    return (!this.selectedBrand || ad.brand === this.selectedBrand) &&
           (!this.selectedModel || ad.model === this.selectedModel) &&
           (!this.selectedYear || ad.year === this.selectedYear) &&
           (!this.selectedTransmission || ad.boiteVitesse === this.selectedTransmission) &&
           (!this.selectedEnergy || ad.carburant === this.selectedEnergy);
  });
}
onBrandChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedBrand = selectElement.value;

  if (this.selectedBrand) {
    this.models = this.allModels[this.selectedBrand] || [];
    this.selectedModel = ''; // Réinitialiser la sélection du modèle
  } else {
    this.models = [];
  }

  this.applyFilters();
}

onModelChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedModel = selectElement.value;

  // Filtrer les annonces par la marque et le modèle sélectionnés
  if (this.selectedModel) {
    this.filteredAds = this.ads.filter(ad => 
      ad.brand === this.selectedBrand && ad.model === this.selectedModel);
  } else if (this.selectedBrand) {
    this.filteredAds = this.ads.filter(ad => ad.brand === this.selectedBrand);
  } else {
    this.filteredAds = this.ads;
  }
}

  fetchAds(): void {
    this.adService.getAds().subscribe(
      (ads) => {
        this.ads = ads;
        this.filteredAds = ads;
        this.ads.forEach(ad => {
          //console.log('ad',ad); 
          this.loadImage(ad);
          ad.timeAgo = this.calculateTimeAgo(ad);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des annonces', error);
      }
    );
  }
  

  getImageUrl(adId: number): string {
    //console.log('id image :' ,adId)
    return `http://localhost:8080/api/ads/${adId}/image`; // URL de l'image
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/voiture.jpg'; // Image de remplacement
  }

  viewAd(ad: Ad): void {
    this.router.navigate(['/ads', ad.id]);
  }
}
