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
import {FCM} from '@ionic-native/fcm/ngx';

import { Camera } from '@ionic-native/camera/ngx';

import {HttpClientModule} from '@angular/common/http';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    
    IonicModule.forRoot(),
    AppRoutingModule,
    HomePageModule,
    RouterModule,
    
    HttpClientModule,
    IonicStorageModule.forRoot()
    
  ],
  providers: [
    AppService,
    StatusBar,
    Camera,
    IonicStorageModule,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
