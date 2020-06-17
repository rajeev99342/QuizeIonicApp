import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home/home.module';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';

import { Camera } from '@ionic-native/camera/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { HttpClientModule } from '@angular/common/http';
import { AppService } from './services/app.service';
import { SignUpPage } from './home/sign-up/sign-up.page';
import { CreateGroupPage } from './home/create-group/create-group.page';
import { NotificationService } from './home/notifications/notification.service';
import {GooglePlus} from '@ionic-native/google-plus/ngx'
import {AngularFireModule} from 'angularfire2'

import {AngularFireAuthModule} from 'angularfire2/auth'


const firebaseConfig = {
  //your config
  apiKey:"AIzaSyCfsSueaefV3apTmfxIVuwiRnf_OBU7P4w"
}

@NgModule({

  imports: [
    BrowserModule,

    IonicModule.forRoot(),
    AppRoutingModule,
    HomePageModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()

  ],
  declarations: [
    AppComponent,
    SignUpPage,
    CreateGroupPage,
  ],
  entryComponents: [SignUpPage,CreateGroupPage],
  providers: [
    GooglePlus,

    AppService,
    StatusBar,
    Camera,
    NotificationService,
    Facebook,
    SplashScreen,

    FCM,
    IonicStorageModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
