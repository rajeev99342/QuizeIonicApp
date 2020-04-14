import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

// import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SignUpPageRoutingModule
  ],
  exports:[],
  declarations: []
})
export class SignUpPageModule {}
