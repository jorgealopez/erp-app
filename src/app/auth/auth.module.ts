import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SignupEffect } from 'src/app/auth/store/effects/signup.effects';
import { reducers } from 'src/app/auth/store/reducers';
import { LoginEffect } from './store/effects/login.effects';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([SignupEffect, LoginEffect]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
