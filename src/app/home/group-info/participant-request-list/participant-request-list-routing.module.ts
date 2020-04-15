import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantRequestListPage } from './participant-request-list.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipantRequestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantRequestListPageRoutingModule {}
