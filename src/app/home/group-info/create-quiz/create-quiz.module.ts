import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuizPageRoutingModule } from './create-quiz-routing.module';

import { CreateQuizPage } from './create-quiz.page';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';
import { AddQuesBankQuestionPage } from './add-ques-bank-question/add-ques-bank-question.page';
import {ImageCropperModule} from 'ngx-image-cropper';
import { QuestSettingPage } from './quest-setting/quest-setting.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuizPageRoutingModule,
    ImageCropperModule
    
  ],
  declarations: [CreateQuizPage,
    AddImageQuestionPage,
    AddQuesBankQuestionPage,
    QuestSettingPage,
    ],
  entryComponents :[AddImageQuestionPage,
    AddQuesBankQuestionPage,
    QuestSettingPage,
    ],
  exports:[ImageCropperModule],
  providers:[]
})
export class CreateQuizPageModule {}
