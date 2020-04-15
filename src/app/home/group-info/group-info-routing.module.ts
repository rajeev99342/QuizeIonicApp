import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupInfoPage } from './group-info.page';

const routes: Routes = [
  {
    path: '',
    component: GroupInfoPage
  },
  {
    path: 'participant',
    loadChildren: () => import('./participant/participant.module').then( m => m.ParticipantPageModule)
  },
  {
    path: 'quize-info',
    loadChildren: () => import('./quize-info/quize-info.module').then( m => m.QuizeInfoPageModule)
  },
  {
    path: 'create-quiz',
    loadChildren: () => import('./create-quiz/create-quiz.module').then( m => m.CreateQuizPageModule)
  },
  {
    path: 'add-participant',
    loadChildren: () => import('./add-participant/add-participant.module').then( m => m.AddParticipantPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class GroupInfoPageRoutingModule {}
