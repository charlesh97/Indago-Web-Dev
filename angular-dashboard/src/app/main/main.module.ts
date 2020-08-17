import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { GoogleMapsModule }  from '@angular/google-maps';

import { environment } from '../../environments/environment';

import { HomeComponent } from '../pages/home/home.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { MainComponent } from './main.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FlexLayoutModule,
    NgxAuthFirebaseUIModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    GoogleMapsModule,

    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MainModule { }
