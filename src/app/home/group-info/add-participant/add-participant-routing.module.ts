import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddParticipantPage } from './add-participant.page';

const routes: Routes = [
  {
    path: '',
    component: AddParticipantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddParticipantPageRoutingModule {}
