import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreGroupsPage } from './explore-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreGroupsPageRoutingModule {}
