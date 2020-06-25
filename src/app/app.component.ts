import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, ModalController, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UserInfo } from './home/constants/userInfo';
import { StorageService } from './home/storage.service';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth'
// import {Observable} from 'rxjs/Observable'
import { FCM } from '@ionic-native/fcm/ngx';
import { SignUpPage } from './home/sign-up/sign-up.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx'
import { Observable } from 'rxjs';
import { AngularFireModule } from 'angularfire2';
import { UserService } from './home/user/service/user.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
var $  : any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  user: Observable<firebase.User>;
  sharableId = null;
  public selectedIndex = 0;
  username: string;
  userData = null;
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
  pic: any;
  constructor(
    public menuCtrl: MenuController,
    private fcm: FCM,
    private router: Router,
    public modalController: ModalController,
    private splashScreen: SplashScreen,
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public gplus: GooglePlus,
    public modalCtrl: ModalController,
    public platform: Platform,
    private clipboard: Clipboard,
    public userService: UserService,
    public fb: Facebook,
    private toastController : ToastController,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private storage: Storage
  ) {
    this.storageService.storage.subscribe((newValue) => {
      // This code will execute when the property has changed and also
      // you'll have access to the object with the information that
      // your service sent in the next() call.
      this.user = this.afAuth.authState;
      this.updateUserName(newValue);
    });
    this.initializeApp();
  }




  GoogleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
      console.log('USER DATA FROM GOOGLE', this.user)
    } else {
      this.webGoogleLogin();
    }
  }

  //  async nativeGoogleLogin(): Promise<any>{
  //     try{

  //           const gPlusUser = await this.gplus.login({
  //               'webClientId':'34056290890-ps9628l6qifti1g16qe8677rm6i4mpi5.apps.googleusercontent.com',
  //               'offline':true,
  //               'scopes':'profile email'
  //           })

  //           return await this.afAuth.auth.signInWithCredential(
  //             firebase.auth.GoogleAuthProvider.credential(gPlusUser.idToken)
  //           )

  //     }catch(e)
  //     {
  //         console.log(e)
  //     }
  //  }
  nativeGoogleLogin() {
    try {

      const gPlusUser = this.gplus.login({
        'webClientId': '34056290890-ps9628l6qifti1g16qe8677rm6i4mpi5.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      }).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential)
          .then(res => {
            console.log('Firebase success', res.user.providerData);
            this.userData = res.user.providerData[0];
            this.signUp(this.userData, "FROM_GOOGLE")
          })
      })


    } catch (e) {
      console.log(e)
    }
  }


  async webGoogleLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider)
    } catch (e) {
      console.log(e);
    }
  }


  signOut() {

    console.log('USER INFO FROM GOOGLE', this.user)
    this.afAuth.auth.signOut();

    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }

  updateUserName(userOBject) {

    if (userOBject == null) {
      this.username = null;
    } else {
      this.username = userOBject.user_name;

      this.pic = userOBject.user_fb_pic;
      this.sharableId = userOBject.user_username;
    }


  }

  copyToClipboard(event) {
    this.clipboard.copy(this.sharableId);
    this.presentToast('Copied')
  }
  async presentToast(ev) {
    const toast = await this.toastController.create({
      message: ev,
      duration: 1000,
      position:'middle',
      color:'success'
    });
    toast.present();
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
          console.log('Received in background',data);
          this.router.navigate([data.landing_page, data.price]);
        } else {
          console.log('Received in foreground',data);
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
        this.username = userObject.user_name;
        this.pic = userObject.user_fb_pic;
        this.sharableId = userObject.user_username;
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
    this.pic = null;

    this.sharableId = null
    this.menuCtrl.close();
    this.storageService.changeAfterLogout(null);
    this.storageService.changeStorageValue(null);
    this.initializeApp();
  }



  async signUp(env, from) {
    const modal = await this.modalController.create({
      component: SignUpPage,
      backdropDismiss: true,
      // cssClass: 'signup-custom-modal-css',
      componentProps: {
        MODAL_TYPE: env,
        FROM: from
      }

    });
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned.data) {
        this.username = dataReturned.data.user_name;
        this.pic = dataReturned.data.user_fb_pic;

        this.sharableId = dataReturned.data.user_username;
        this.storageService.changeStorageValue(dataReturned.data);

      } else {
        console.log('add group member');
      }
    });
    this.menuCtrl.close();

    return await modal.present();

  }

  async signIn(env) {
    const modal = await this.modalController.create({
      component: SignUpPage,
      backdropDismiss: true,
      cssClass: 'signin-custom-modal-css',
      componentProps: {
        MODAL_TYPE: env
      }

    });
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned.data) {
        this.storageService.changeStorageValue(dataReturned.data);
        this.username = dataReturned.data.user_name;

        this.pic = dataReturned.data.user_fb_pic;
        this.sharableId = dataReturned.data.user_username;
      } else {
        console.log('add group member');
      }
    });
    this.menuCtrl.close();

    return await modal.present();
  }


  login() {
    this.userService.loginUser("sonu", "123").subscribe((result) => {
      console.log('user Logged in', result);

      if (result["status"] != "Failed") {
        this.storage.set("kidder_user", {
          user_username: result["user_username"],
          user_name: result["user_name"],
          user_fb_id: result["user_fb_id"],
          user_fb_pic: result["user_fb_pic"],
          user_type: result["user_type"],
          user_password: result["user_password"],
          user_id: result["user_id"],

          user_token: result["user_token"],
          uniqueCode: result["uniqueCode"],
        });
        console.log('Fomr submitted');
        this.username = result["user_username"];
        this.storageService.changeStorageValue(result);
      } else {

      }

      if (this.username != null) {
        this.modalCtrl.dismiss(result);

      }

    })
  }

  facebookLogin(env) {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        // alert(JSON.stringify(res))
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          this.userData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'], id: profile["id"] };
          console.log('PROFILE', profile)
          this.signUp(this.userData, "FROM_FB");
        })
      }
      )
      .catch(e => console.log('Error logging into Facebook', e));
  }


}
