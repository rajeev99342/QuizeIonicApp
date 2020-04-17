import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOptionsPageRoutingModule } from './add-options-routing.module';

import { AddOptionsPage } from './add-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOptionsPageRoutingModule
  ],
  declarations: [AddOptionsPage]
})
export class AddOptionsPageModule {}
