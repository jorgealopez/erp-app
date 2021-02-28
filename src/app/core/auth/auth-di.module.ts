import { NgModule } from '@angular/core';
import { AuthCustomProcessor } from './processors/auth-custom.processor';
import { AuthFirebaseProcessor } from './processors/auth-firebase.processor';
import { AuthProcessorToken } from './auth-processor.interface';


@NgModule({
  providers: [
    {
      provide: AuthProcessorToken,
      useClass: AuthFirebaseProcessor, multi: true,
    },
    {
      provide: AuthProcessorToken,
      useClass: AuthCustomProcessor, multi: true,
    },
  ],
})
export class AuthDiModule {}
