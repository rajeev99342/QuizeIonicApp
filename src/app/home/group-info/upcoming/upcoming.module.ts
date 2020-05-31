import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { UpcomingPage } from './upcoming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
  declarations: [UpcomingPage],
  entryComponents:[UpcomingPage]
})
export class UpcomingPageModule {}
