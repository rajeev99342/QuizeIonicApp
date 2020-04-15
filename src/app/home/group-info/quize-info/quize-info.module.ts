import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizeInfoPageRoutingModule } from './quize-info-routing.module';

import { QuizeInfoPage } from './quize-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizeInfoPageRoutingModule
  ],
  declarations: [QuizeInfoPage]
})
export class QuizeInfoPageModule {}
