import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuizPageRoutingModule } from './create-quiz-routing.module';

import { CreateQuizPage } from './create-quiz.page';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';
import { AddQuesBankQuestionPage } from './add-ques-bank-question/add-ques-bank-question.page';
import { Camera } from '@ionic-native/camera/ngx';
import {ImageCropperModule} from 'ngx-image-cropper';
import { AddOptionsPage } from './add-image-question/add-options/add-options.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuizPageRoutingModule,
    ImageCropperModule
    
  ],
  declarations: [CreateQuizPage,AddImageQuestionPage,AddQuesBankQuestionPage,AddOptionsPage],
  entryComponents :[AddImageQuestionPage,AddQuesBankQuestionPage,AddOptionsPage],
  exports:[ImageCropperModule],
  providers:[Camera]
})
export class CreateQuizPageModule {}
