import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SubjectConfirmPage } from './subject-confirm/subject-confirm.page';
import { SignUpPage } from './sign-up/sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
  ],
  entryComponents:[SubjectConfirmPage,SignUpPage],
  declarations: [HomePage,SubjectConfirmPage,SignUpPage],
  exports:[]
})
export class HomePageModule {}
