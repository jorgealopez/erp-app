import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';

import {
  faCoffee,
  faSearch,
  faFillDrip,
  faUserAstronaut,
  faUserCog,
  faShoePrints,
} from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faAddressBook,
  faUser,
  faEnvelope,
} from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SidenavService } from './services/sidenav.service';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(fasIconLibrary: FaIconLibrary, faConfig: FaConfig) {
    // Añade un icono a la lberería para que otros componentes
    // tengan acceso
    fasIconLibrary.addIcons(
      faCoffee,
      faAddressBook,
      faGithub,
      faEnvelope,
      fasStar,
      farStar,
      faBell,
      faSearch,
      faUser,
      faFillDrip,
      faUserAstronaut,
      faUserCog,
      faShoePrints
    );
    faConfig.defaultPrefix = 'fas';
  }
}
