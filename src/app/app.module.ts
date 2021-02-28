import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import {
//   FaConfig,
//   FaIconLibrary,
//   FontAwesomeModule,
// } from '@fortawesome/angular-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';
// import {
//   faAddressBook,
//   faBell,
//   faEnvelope,
//   faStar as farStar,
//   faUser,
// } from '@fortawesome/free-regular-svg-icons';
//
// import {
//   faCoffee,
//   faFillDrip,
//   faSearch,
//   faShoePrints,
//   faStar as fasStar,
//   faUserAstronaut,
//   faUserCog,
// } from '@fortawesome/free-solid-svg-icons';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
// import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './ui/auth/auth.module';
import { HomeComponent } from './ui/home/home.component';

import { MaterialModule } from './material.module';

import { MenuComponent } from './ui/menu/menu.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { AuthDiModule } from './core/auth/auth-di.module';
import { SidenavService } from './core/services/sidenav.service';
import { SharedModule } from './shared.module';
import { AuthState } from './store/auth/auth.state';
import { SidenavState } from './store/sidenav/sidenav.state';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'legacy',
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    AuthDiModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    NgxsModule.forRoot([ AuthState, SidenavState ], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),
    NgxsStoragePluginModule.forRoot({
      key: [ AuthState, SidenavState]
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    // NgxsEmitPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    SidenavService, {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance,
  }],
  bootstrap: [ AppComponent ],
})
export class AppModule {
  // constructor( fasIconLibrary: FaIconLibrary, faConfig: FaConfig ) {
  // Añade un icono a la librería para que otros componentes
  // tengan acceso
  //   fasIconLibrary.addIcons(
  //     faCoffee,
  //     faAddressBook,
  //     faGithub,
  //     faEnvelope,
  //     fasStar,
  //     farStar,
  //     faBell,
  //     faSearch,
  //     faUser,
  //     faFillDrip,
  //     faUserAstronaut,
  //     faUserCog,
  //     faShoePrints,
  //   );
  //   faConfig.defaultPrefix = 'fas';
  // }
}
