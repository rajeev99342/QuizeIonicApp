import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupInfoPageRoutingModule } from './group-info-routing.module';

import { GroupInfoPage } from './group-info.page';
import { ParticipantPage } from './participant/participant.page';
import { QuizeInfoPage } from './quize-info/quize-info.page';
import { AddParticipantPage } from './add-participant/add-participant.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { UpcomingPageModule } from './upcoming/upcoming.module';
import { CompletedPageModule } from './completed/completed.module';
import { ParticipantPageModule } from './participant/participant.module';
import { ParticipantRequestListPageModule } from './participant-request-list/participant-request-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperTabsModule.forRoot(),
    GroupInfoPageRoutingModule,
    UpcomingPageModule,
    CompletedPageModule,
    ParticipantPageModule,
    ParticipantRequestListPageModule
  ],
  declarations: [GroupInfoPage,QuizeInfoPage,AddParticipantPage],
  entryComponents : [QuizeInfoPage,AddParticipantPage]
})
export class GroupInfoPageModule {}
