import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddParticipantPageRoutingModule } from './add-participant-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddParticipantPageRoutingModule
  ],
  declarations: []
})
export class AddParticipantPageModule {}
