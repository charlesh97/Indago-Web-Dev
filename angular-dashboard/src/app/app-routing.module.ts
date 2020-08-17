import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MainComponent } from './main/main.component';
import {LoggedInGuard} from 'ngx-auth-firebaseui';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },  
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [LoggedInGuard]
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
