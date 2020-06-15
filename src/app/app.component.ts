import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UserInfo } from './home/constants/userInfo';
import { StorageService } from './home/storage.service';
import { Router } from '@angular/router';

import { FCM } from '@ionic-native/fcm/ngx';
import { SignUpPage } from './home/sign-up/sign-up.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  username: string;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }, {
      title: 'Explore Group',
      url: '/explore',
      icon: 'search'
    }
  ];
  public labels = ['log out'];

  constructor(
    public menuCtrl: MenuController,
    private fcm: FCM,
    private router: Router,
    private platform: Platform,
    public modalController: ModalController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private storage: Storage
  ) {
    this.storageService.storage.subscribe((newValue) => {
      // This code will execute when the property has changed and also
      // you'll have access to the object with the information that
      // your service sent in the next() call.

      this.updateUserName(newValue);
    });
    this.initializeApp();
  }


  updateUserName(userOBject) {

    if (userOBject == null) {
      this.username = null;
    } else {
      this.username = userOBject.user_username;
    }


  }

  initializeApp() {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(true);

    this.createSqliteUserDB();
    // set status bar to white
    // this.statusBar.backgroundColorByHexString('#FF5733');
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#40C34D");
      }
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        console.log('Hi there')
        this.storage.set("kidder001_fcm_token", token);
        console.log(token);
      })
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
        this.storage.set("kidder001_fcm_token", token);
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


  createSqliteUserDB() {

  }

  ngOnInit() {

    this.storage.get('kidder_user').then((userObject) => {

      if (userObject != null) {
        this.username = userObject.user_username;
        console.log("username exits", this.username)
        if (this.username != null) {
          UserInfo.setUserName(this.username);

        }
      }


    });


    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }


  logout() {

    this.storage.set("kidder_user", "");
    this.storage.set("kidder001_fcm_token", "");

    this.updateUserName(null);
    this.menuCtrl.close();
    this.storageService.changeAfterLogout(null);
    this.storageService.changeStorageValue(null);

  }

 

  async signUp(env) {
    const modal = await this.modalController.create({
      component: SignUpPage,
      backdropDismiss:true,
      cssClass : 'signup-custom-modal-css',
      componentProps:{
        MODAL_TYPE : env
      }

    });
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned.data) {
        this.username = dataReturned.data.user_username;
        this.storageService.changeStorageValue(dataReturned.data);

        } else {
          console.log('add group member');
      }
    });
    this.menuCtrl.close();

    return await modal.present();

    }

    async signIn(env)
    {
      const modal = await this.modalController.create({
        component: SignUpPage,
        backdropDismiss:true,
        cssClass : 'signin-custom-modal-css',
        componentProps:{
          MODAL_TYPE : env
        }

      });
      modal.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
            this.storageService.changeStorageValue(dataReturned.data);
            this.username = dataReturned.data.user_username;
          } else {
            console.log('add group member');
        }
      });
      this.menuCtrl.close();
  
      return await modal.present();
    }


}
