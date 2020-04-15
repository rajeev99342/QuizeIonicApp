import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddQuesBankQuestionPage } from './add-ques-bank-question.page';

const routes: Routes = [
  {
    path: '',
    component: AddQuesBankQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddQuesBankQuestionPageRoutingModule {}
