import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SubjectConfirmPage } from './subject-confirm.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: SubjectConfirmPage
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectConfirmPageRoutingModule {}
