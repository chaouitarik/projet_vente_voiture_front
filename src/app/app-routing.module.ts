import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AdSearchComponent } from './ad-search/ad-search.component';
import { AdUserComponent } from './ad-user/ad-user.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'ads', component: AdListComponent },
  { path: 'create-ad', component: CreateAdComponent , canActivate: [AuthGuard] },
  { path: '', redirectTo: '/ads', pathMatch: 'full' },
  { path: 'ads/search', component: AdSearchComponent },
  { path: 'user/:id', component: AdUserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'ads/:id', component: AdDetailComponent },
  { path: 'register', component: RegisterComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
