import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ParticipantRequestListPage} from './participant-request-list.page'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ParticipantRequestListPage],
  entryComponents : [ParticipantRequestListPage]
})
export class ParticipantRequestListPageModule {}
