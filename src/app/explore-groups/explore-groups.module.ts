import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreGroupsPageRoutingModule } from './explore-groups-routing.module';

import { ExploreGroupsPage } from './explore-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreGroupsPageRoutingModule
  ],
  declarations: [ExploreGroupsPage]
})
export class ExploreGroupsPageModule {}
