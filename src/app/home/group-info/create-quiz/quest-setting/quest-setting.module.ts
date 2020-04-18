import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestSettingPageRoutingModule } from './quest-setting-routing.module';

import { QuestSettingPage } from './quest-setting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestSettingPageRoutingModule
  ],
  declarations: [QuestSettingPage]
})
export class QuestSettingPageModule {}
