import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuizPageRoutingModule } from './create-quiz-routing.module';

import { CreateQuizPage } from './create-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuizPageRoutingModule
  ],
  declarations: [CreateQuizPage]
})
export class CreateQuizPageModule {}
