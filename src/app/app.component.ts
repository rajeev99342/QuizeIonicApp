import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UserInfo } from './home/constants/userInfo';
import { StorageService } from './home/storage.service';

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
    }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
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
      this.updateUserName(newValue);
    });
    this.initializeApp();
  }


  updateUserName(username){

      this.username = username

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    
     this.storage.get('kidder_user').then((username)=>{
      this.username = username;
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
