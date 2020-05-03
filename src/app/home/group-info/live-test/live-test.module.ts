import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveTestPageRoutingModule } from './live-test-routing.module';

import { LiveTestPage } from './live-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveTestPageRoutingModule
  ],
  declarations: [LiveTestPage]
})
export class LiveTestPageModule {}
