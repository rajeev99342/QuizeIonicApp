import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticipantRequestListPageRoutingModule } from './participant-request-list-routing.module';

import { ParticipantRequestListPage } from './participant-request-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticipantRequestListPageRoutingModule
  ],
  declarations: [ParticipantRequestListPage]
})
export class ParticipantRequestListPageModule {}
