import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  searchQuery: string = '';
  constructor(public  authService :AuthService,private router: Router, private adService: AdService) { }

  ngOnInit(): void {
  }
  searchAds() {
    if (this.searchQuery.trim()) {
      console.log("this.searchQuery",this.searchQuery);
      this.router.navigate(['/ads/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  handlelogout() {

    console.log("erooooooooooooor");
    this.authService.logout();
  

}

}
