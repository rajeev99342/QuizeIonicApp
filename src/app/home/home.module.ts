import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SubjectConfirmPage } from './subject-confirm/subject-confirm.page';
import { SignUpPage } from './sign-up/sign-up.page';
import { CreateGroupPage } from './create-group/create-group.page';
import {GroupInfoPageModule} from "./group-info/group-info.module"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    GroupInfoPageModule
    
  ],
  entryComponents:[SubjectConfirmPage,SignUpPage,CreateGroupPage],
  declarations: [HomePage,SubjectConfirmPage,SignUpPage,CreateGroupPage],
  exports:[ReactiveFormsModule,FormsModule,GroupInfoPageModule]
})
export class HomePageModule {}
