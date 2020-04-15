import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupInfoPageRoutingModule } from './group-info-routing.module';

import { GroupInfoPage } from './group-info.page';
import { ParticipantPage } from './participant/participant.page';
import { QuizeInfoPage } from './quize-info/quize-info.page';
import { AddParticipantPage } from './add-participant/add-participant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupInfoPageRoutingModule
  ],
  declarations: [GroupInfoPage,ParticipantPage,QuizeInfoPage,AddParticipantPage],
  entryComponents : [ParticipantPage,QuizeInfoPage,AddParticipantPage]
})
export class GroupInfoPageModule {}
