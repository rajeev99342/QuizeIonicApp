import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddImageQuestionPageRoutingModule } from './add-image-question-routing.module';

import { AddImageQuestionPage } from './add-image-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddImageQuestionPageRoutingModule
  ],
  declarations: [AddImageQuestionPage]
})
export class AddImageQuestionPageModule {}
