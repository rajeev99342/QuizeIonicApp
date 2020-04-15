import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddQuesBankQuestionPageRoutingModule } from './add-ques-bank-question-routing.module';

import { AddQuesBankQuestionPage } from './add-ques-bank-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddQuesBankQuestionPageRoutingModule
  ],
  declarations: [AddQuesBankQuestionPage]
})
export class AddQuesBankQuestionPageModule {}
