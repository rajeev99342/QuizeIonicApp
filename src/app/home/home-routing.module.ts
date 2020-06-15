import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'subject-list',
    loadChildren: () => import('./subject-list/subject-list.module').then( m => m.SubjectListPageModule)
  },
 
  {
    path: 'subject-confirm',
    loadChildren: () => import('./subject-confirm/subject-confirm.module').then( m => m.SubjectConfirmPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./thankyou/thankyou.module').then( m => m.ThankyouPageModule)
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'group-info',
    loadChildren: () => import('./group-info/group-info.module').then( m => m.GroupInfoPageModule)
  },
  {
    path: 'notifications/:price',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
