import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveTestPage } from './live-test.page';

const routes: Routes = [
  {
    path: '',
    component: LiveTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveTestPageRoutingModule {}
