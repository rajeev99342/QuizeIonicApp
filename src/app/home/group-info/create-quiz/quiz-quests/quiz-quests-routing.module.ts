import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizQuestsPage } from './quiz-quests.page';

const routes: Routes = [
  {
    path: '',
    component: QuizQuestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizQuestsPageRoutingModule {}
