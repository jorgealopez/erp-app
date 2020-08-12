import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FaConfig,
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faAddressBook,
  faBell,
  faEnvelope,
  faStar as farStar,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

import {
  faCoffee,
  faFillDrip,
  faSearch,
  faShoePrints,
  faStar as fasStar,
  faUserAstronaut,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';

import { MenuComponent } from './menu/menu.component';
import { SidenavService } from './services/sidenav.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ AppComponent, MenuComponent, HomeComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    EmployeesModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [ SidenavService ],
  bootstrap: [ AppComponent ],
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
      faShoePrints,
    );
    faConfig.defaultPrefix = 'fas';
  }
}
