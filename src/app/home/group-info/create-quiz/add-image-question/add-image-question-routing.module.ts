import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddImageQuestionPage } from './add-image-question.page';

const routes: Routes = [
  {
    path: '',
    component: AddImageQuestionPage
  },
  {
    path: 'add-options',
    loadChildren: () => import('./add-options/add-options.module').then( m => m.AddOptionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddImageQuestionPageRoutingModule {}
