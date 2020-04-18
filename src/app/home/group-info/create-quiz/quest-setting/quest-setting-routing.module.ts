import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestSettingPage } from './quest-setting.page';

const routes: Routes = [
  {
    path: '',
    component: QuestSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestSettingPageRoutingModule {}
