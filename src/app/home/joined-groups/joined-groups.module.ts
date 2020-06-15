import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { JoinedGroupsPage } from './joined-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
    
  ],
  declarations: [JoinedGroupsPage],
  entryComponents:[JoinedGroupsPage]
})
export class JoinedGroupsPageModule {}
