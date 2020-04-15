import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuizPageRoutingModule } from './create-quiz-routing.module';

import { CreateQuizPage } from './create-quiz.page';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';
import { AddQuesBankQuestionPage } from './add-ques-bank-question/add-ques-bank-question.page';
import { Camera } from '@ionic-native/camera/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuizPageRoutingModule,
    
  ],
  declarations: [CreateQuizPage,AddImageQuestionPage,AddQuesBankQuestionPage],
  entryComponents :[AddImageQuestionPage,AddQuesBankQuestionPage],
  exports:[],
  providers:[Camera]
})
export class CreateQuizPageModule {}
