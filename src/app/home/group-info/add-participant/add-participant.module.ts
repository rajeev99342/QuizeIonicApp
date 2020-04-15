import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddParticipantPageRoutingModule } from './add-participant-routing.module';

import { AddParticipantPage } from './add-participant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddParticipantPageRoutingModule
  ],
  declarations: [AddParticipantPage]
})
export class AddParticipantPageModule {}
