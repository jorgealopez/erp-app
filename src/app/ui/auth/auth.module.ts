import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthProcessorService } from 'src/app/core/auth/services/auth-processor.service';
import { MaterialModule } from '../../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [ LoginComponent, SignupComponent ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [ AuthProcessorService ],
})
export class AuthModule {}
