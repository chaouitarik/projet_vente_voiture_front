import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdListComponent } from './ad-list/ad-list.component';
import { MenuComponent } from './menu/menu.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth-interceptor';
import { AdSearchComponent } from './ad-search/ad-search.component';
import { AdUserComponent } from './ad-user/ad-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhoneModalComponent } from './phone-modal/phone-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CreateAdComponent,
    AdListComponent,
    MenuComponent,
    AdDetailComponent,
    AdSearchComponent,
    AdUserComponent,
    PhoneModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [ 
    AuthService,
   //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
