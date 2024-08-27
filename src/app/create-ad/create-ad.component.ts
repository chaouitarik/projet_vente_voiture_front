import { Component } from '@angular/core';
import { AdService } from '../ad.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpHeaders } from '@angular/common/http';
interface ModelDictionary {
  [key: string]: string[];
}
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent {
  images: File[] = []; 
  title: string = '';
  description: string = '';
  price: number | undefined;
  categoryName: string = '';
  image: File | null = null;
  brand :string = '' ;
  km :number | undefined;
  model :string = '';
  villeName :string | null = null ;
  year :string = '';
  villes: string[] = ['Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tanger', 
  'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 
  'Safi', 'El Jadida', 'Khouribga', 'Nador', 'Béni Mellal', 
  'Mohammédia', 'Kénitra', 'Laâyoune', 'Ksar El Kebir', 
  'Larache', 'Khemisset', 'Sidi Slimane', 'Sidi Kacem', 
  'Taroudant', 'Ouarzazate', 'Al Hoceima', 'Taza', 
  'Settat', 'Salé', 'Essaouira', 'Berkane', 'Taourirt', 
  'Guercif', 'Errachidia', 'Midelt', 'Azrou', 'Ifrane', 
  'Boujdour', 'Tan-Tan', 'Guelmim', 'Assa', 'Smara', 
  'Dakhla', 'Zagora', 'Sidi Ifni', 'Tiznit', 'Beni Ansar', 
  'Chefchaouen', 'Sefrou', 'Ouezzane', 'Chichaoua', 
  'Ait Melloul', 'Youssoufia', 'Benslimane', 'Tiflet', 
  'Bouznika', 'Ouazzane', 'Moulay Yacoub', 'Azilal', 
  'Demnate', 'El Kelaa des Sraghna', 'Taroudannt', 
  'Tata', 'Boulemane', 'Erfoud', 'Fquih Ben Salah', 
  'Bouskoura', 'Tit Mellil', 'Sidi Bennour', 'Sidi Bou Othmane', 
  'Lalla Takerkoust', 'Tamesna', 'Ait Ourir', 'Zawyat Cheikh', 
  'Jorf', 'Bouarfa', 'Ahfir', 'Bni Bouayach', 'Imzouren', 
  'Tiznit', 'Asilah', 'Sidi Ifni', 'Martil', 'M\'diq', 
  'Fnideq', 'Souk El Arbaa', 'Akka', 'Anza', 'Aourir', 
  'M\'diq', 'Fnideq', 'Sidi Rahal', 'El Gara', 'Jorf Lasfar', 
  'Sidi Bouzid', 'Aghbala', 'Ouled Teima', 'Ait Baha', 
  'Boulemane Dadès', 'Taghazout', 'Tamellalt', 'Tata', 
  'Tarfaya', 'Zag', 'Sidi Allal Tazi', 'Temara']; 
  categories: string[] = ['Immobilier', 'Véhicules', 'Emploi', 'Autres']; 
  boiteVitesse : string ='';
  carburant: string = '';
  fuelTypes: string[] = ['Essence', 'Diesel', 'Hybride', 'Electrique', 'GPL', 'Gaz naturel (CNG)', 'Autre'];
  brands: string[] = ['Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti',
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
  models: string[] = []; // Ce tableau sera mis à jour en fonction de la marque sélectionnée
  selectedBrand: string | undefined;
  selectedModel: string | undefined;
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
  years: string[] = ['2024', '2023', '2022', '2021'];
  constructor(private adService: AdService, private router: Router,private authService: AuthService) {}

  onFileChange(event: any) {
    this.images = Array.from(event.target.files);
  }
  onBrandChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBrand = selectElement.value;
    this.models = this.allModels[selectedBrand] || [];
    this.selectedModel = undefined; // Réinitialiser la sélection du modèle
  }
  onSubmit() {
    console.log('Title:', this.title);
console.log('Description:', this.description);
console.log('Price:', this.price);
console.log('Category:', this.categoryName);
console.log('Fuel:', this.carburant);
console.log('Gearbox:', this.boiteVitesse);
console.log('Brand:', this.brand);
console.log('Model:', this.model);
console.log('Year:', this.year);
console.log('City:', this.villeName);
    if (this.title && this.description && this.price && this.categoryName && this.carburant &&  this.boiteVitesse && this.selectedBrand && this.selectedModel && this.year &&this.villeName &&this.km) {
      const adData = new FormData();
      const adDetails = {
        title: this.title,
        description: this.description,
        price: this.price,
        categoryName: this.categoryName,
        carburant: this.carburant,
        boiteVitesse : this.boiteVitesse ,
        km : this.km,
        brand :this.selectedBrand ,
        model :this.selectedModel ,
        year :this.year ,
        ville :this.villeName,
        createdDate: new Date().toISOString()

      };
  
      adData.append('adData', new Blob([JSON.stringify(adDetails)], { type: "application/json" }));
      
      this.images.forEach((image) => {
        adData.append('images', image); // Append chaque image avec le même nom de champ
      });
      const token = this.authService.getToken();  // Récupérer le token à partir du service d'authentification
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
      });
  
      this.adService.createAd(adData,headers).subscribe(response => {
        console.log('Annonce créée avec succès!', response);
        this.router.navigate(['/ads']).then(success => {
          if (success) {
            console.log('Navigation réussie');
          } else {
            console.log('Navigation échouée');
          }
        });
      }, error => {
        console.error('Erreur lors de la création de l\'annonce', error);
      });
    } else {
      console.log('Tous les champs sont requis.');
    }
  }
}