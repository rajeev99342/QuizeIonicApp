import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizQuestsPageRoutingModule } from './quiz-quests-routing.module';

import { QuizQuestsPage } from './quiz-quests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizQuestsPageRoutingModule
  ],
  declarations: [QuizQuestsPage]
})
export class QuizQuestsPageModule {}
