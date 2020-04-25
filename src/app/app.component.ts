import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UserInfo } from './home/constants/userInfo';
import { StorageService } from './home/storage.service';
import { Router } from '@angular/router';

import {FCM} from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
   username : string;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },{
      title : 'Explore Group',
      url : '/explore',
      icon : 'search'
    }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private fcm: FCM,
     private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService : StorageService,
    private storage : Storage
  ) {
      this.storageService.storage.subscribe((newValue) => {
      // This code will execute when the property has changed and also
      // you'll have access to the object with the information that
      // your service sent in the next() call.
      this.updateUserName(newValue.user_username);
    });
    this.initializeApp();
  }


  updateUserName(username){

      this.username = username

  }

  initializeApp() {
    // let status bar overlay webview
  this.statusBar.overlaysWebView(true);

  this.createSqliteUserDB();
// set status bar to white
// this.statusBar.backgroundColorByHexString('#FF5733');
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#FFFFFF");
      }
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        console.log('Hi there')
        this.storage.set("fcm_token",token);
        console.log(token);
      })
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground');
          this.router.navigate([data.landing_page, data.price]);
        }
      });

    });

   
  }


  createSqliteUserDB()
  {

  }

  ngOnInit() {
    
     this.storage.get('kidder_user').then((userObject)=>{
      this.username = userObject.user_username;
      console.log("username exits",this.username)
      if(this.username != null)
      {
        UserInfo.setUserName(this.username);

      }

    });


    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
