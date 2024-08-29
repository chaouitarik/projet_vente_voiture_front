import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../ad.service';
import { Ad } from '../models/ad.model';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhoneModalComponent } from '../phone-modal/phone-modal.component';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  ad: Ad | undefined ;

  constructor(private route: ActivatedRoute,private adService: AdService,public authService: AuthService,private modalService: NgbModal
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
        this.loadImages(ad);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'annonce', error);
      }
    );
  }
  loadImages(ad: Ad): void {
    this.adService.getImages(ad.id).subscribe(
      (imageBase64List) => {
        ad.imageSrcList = imageBase64List.map(base64 => `data:image/jpeg;base64,${base64}`);
      },
      (error) => {
        console.error('Erreur lors de la récupération des images', error);
      }
    );
  }
  openPhoneModal(): void {
  
  if (this.ad && this.ad.user.phoneNumber) {
      console.log("this.ad.user.phonenumber",this.ad.user.phoneNumber);
      const modalRef = this.modalService.open(PhoneModalComponent);
      modalRef.componentInstance.phoneNumber = this.ad.user.phoneNumber;
    }
  }
}

