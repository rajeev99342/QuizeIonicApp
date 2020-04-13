import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectListPageRoutingModule } from './subject-list-routing.module';

import { SubjectListPage } from './subject-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectListPageRoutingModule
  ],
  declarations: [SubjectListPage]
})
export class SubjectListPageModule {}
