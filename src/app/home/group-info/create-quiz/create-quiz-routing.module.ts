import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQuizPage } from './create-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: CreateQuizPage
  },
  {
    path: 'add-image-question',
    loadChildren: () => import('./add-image-question/add-image-question.module').then( m => m.AddImageQuestionPageModule)
  },
  {
    path: 'add-ques-bank-question',
    loadChildren: () => import('./add-ques-bank-question/add-ques-bank-question.module').then( m => m.AddQuesBankQuestionPageModule)
  },
  {
    path: 'quest-setting',
    loadChildren: () => import('./quest-setting/quest-setting.module').then( m => m.QuestSettingPageModule)
  },
  {
    path: 'quiz-quests',
    loadChildren: () => import('./quiz-quests/quiz-quests.module').then( m => m.QuizQuestsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuizPageRoutingModule {}
