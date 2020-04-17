import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOptionsPage } from './add-options.page';

const routes: Routes = [
  {
    path: '',
    component: AddOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOptionsPageRoutingModule {}
