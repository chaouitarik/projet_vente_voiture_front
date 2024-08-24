import { Component, OnInit } from '@angular/core';
import { AdService } from '../ad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Ad } from '../models/ad.model';

@Component({
  selector: 'app-ad-user',
  templateUrl: './ad-user.component.html',
  styleUrls: ['./ad-user.component.css']
})
export class AdUserComponent implements OnInit {

  ads: Ad[] = [];
  userId: string | null = '';
  constructor(private adService: AdService, private route: ActivatedRoute,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer l'ID utilisateur à partir de l'URL
   
    this.userId = this.authService.getCurrentUserId();
    console.log('this.userId', this.userId);
    
    if (this.userId) {
      // Charger les annonces de l'utilisateur
      this.loadUserAds();
    } else {
      console.error('User ID not found');
      // Gérer le cas où l'utilisateur n'est pas authentifié
    }
  }

  deleteAd(ad: Ad): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.adService.deleteAd(ad.id).subscribe(
        () => {
          this.ads = this.ads.filter(a => a.id !== ad.id);
          console.log(`Annonce ${ad.id} supprimée avec succès.`);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'annonce', error);
        }
      );
    }
  }
  

  loadUserAds(): void {
    if (this.userId) {  // Vérifiez que userId n'est pas null
      console.log('this.userId', this.userId);
      this.adService.getAdsByUser(this.userId).subscribe(
        (ads) => {
          this.ads = ads;
          this.ads.forEach(ad => {
          this.loadImage(ad);
        });
        },
        (error) => {
          console.error('Erreur lors du chargement des annonces de l\'utilisateur', error);
        }
      );
    } else {
      console.error('User ID is null. Unable to load user ads.');
      // Vous pouvez gérer cela en redirigeant l'utilisateur ou en affichant un message
      this.router.navigate(['/login']); // Par exemple, rediriger vers la page de connexion
    }
  }
  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/images/voiture.jpg'; // Remplacez par l'image de votre choix
  }

  viewAd(ad: any) {
    // Naviguer vers la page de détails de l'annonce en utilisant l'ID de l'annonce
    this.router.navigate(['/ads', ad.id]);
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
}

