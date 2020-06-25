import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController, ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { USER_TYPE_NUMBER, USER_TYPE_STRING } from '../constants/UserType'
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  RequiredValidator,

  Form
} from "@angular/forms";
// import { ToastController } from 'ionic-angular';

import { MesssageServicesService } from '../services/messsage-services.service';
import { userModel } from '../user/userModel';
import { UserService } from '../user/service/user.service';
import { StorageService } from '../storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FCM } from '@ionic-native/fcm/ngx';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  selectedTab: string = "signuptab";
  // private popoverController: PopoverController
  username_error_flg: boolean = false;
  error_message: string;
  error_message_flag: boolean;
  username: string;
  user_name: FormControl;
  user_username: FormControl;
  user_password: FormControl;
  re_user_password: FormControl;

  user_email: FormControl;
  user_website: FormControl;
  user_referal_threshol: FormControl;
  user_institute: FormControl
  user_address: FormControl
  user_type: FormControl
  user_refer_col: FormControl
  user_refer_from: FormControl
  user_is_Competator: FormControl
  myform: FormGroup;
  user_model: userModel;
  examList: any[] = [];
  selectedExamList: any[] = [];
  password_error_flag: boolean = false;
  userType = null;
  login_user_username: string;
  login_user_password: string;
  userData = null;
  modal_type: string;
  disableUserType: boolean = false;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private storage: Storage,
    private navParams: NavParams,
    private fcm: FCM,

    private storageService: StorageService,
    private messageEventEmitterService: MesssageServicesService) { }

  ngOnInit() {
    this.modal_type = this.navParams.get('MODAL_TYPE');
    let from = this.navParams.get('FROM')
    console.log('USER DATA ', this.modal_type)
    console.log('FROM ', from)
    this.userData = {}
    if (this.modal_type != 'SIGN_UP' && this.modal_type != 'SIGN_IN') {

      if (from == "FROM_GOOGLE") {
        this.userData.username = this.modal_type["displayName"];
        this.userData.email = this.modal_type["email"]
        this.userData.id = this.modal_type["uid"]
        this.userData.picture = this.modal_type["photoURL"]
        console.log('INSIDE FROM GOOGLE')
        console.log(this.modal_type["displayName"], this.modal_type["email"], this.modal_type["uid"], this.modal_type["photoURL"],);

      } else {
        this.userData = this.modal_type;
        console.log('INSIDE FROM FB')

        // console.log('USER DATA',this.userData)
      }


      // console.log('USER DATA',this.userData)

      this.userService.findUserByFbIdOrUsername(this.userData.id).subscribe((res: userModel) => {
        console.log('USER DATA FROM DB', res);
        if (res) {
          if (res.user_type == USER_TYPE_NUMBER.STUDENT) {
            this.userType = USER_TYPE_STRING.STUDENT;
          } else if (res.user_type == USER_TYPE_NUMBER.TEACHER) {
            this.userType = USER_TYPE_STRING.TEACHER;

          }
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

          this.disableUserType = true;
        }
      }, error => {
        console.log(error)
      })

    } else {
      console.log('NOT GOOGLE NOT FB')
    }

    this.createFormControls();
    this.createForm();
  }

  createFormControls() {

    this.user_name = new FormControl("", [
      Validators.required
    ]);
    this.user_username = new FormControl("", [
      Validators.required
    ]);

    this.user_password = new FormControl("", [
      Validators.required
    ]);

    this.re_user_password = new FormControl("", [Validators.required]);

    // this.user_username = new FormControl(",", [
    //   Validators.required
    // ]);
    // this.user_username = new FormControl(",", [
    //   Validators.required
    // ]);
    // this.user_username = new FormControl(",", [
    //   Validators.required
    // ]);

  }

  createForm() {
    this.myform = new FormGroup({
      user_name: this.user_name,
      user_username: this.user_username,
      user_password: this.user_password,
      re_user_password: this.re_user_password
      // mfstBatchSize : this.mfstBatchSize
    });
  }

  async register() {

    if (this.setUserData() == false) {
      console.log('Password not matches')
    } else {



      if (this.userType == null) {
        this.error_message_flag = true;
        return;
      } else {
        this.storage.get("kidder001_fcm_token").then((token) => {


          this.user_model.user_token = token;
          this.error_message = null;
          this.username = null;
          this.password_error_flag = false;
          this.username_error_flg = false;
          this.user_model.user_username = this.userData.id;
          this.user_model.user_email = this.userData.email;
          this.user_model.user_fb_id = this.userData.id;
          // display name
          this.user_model.user_name = this.userData.username;
          this.username = this.userData.id;
          this.user_model.user_fb_pic = this.userData.picture;
          this.user_model.user_password = "pass";

          if (this.userType == USER_TYPE_STRING.STUDENT) {
            this.user_model.user_type = USER_TYPE_NUMBER.STUDENT;
          } else if (this.userType == USER_TYPE_STRING.TEACHER) {
            this.user_model.user_type = USER_TYPE_NUMBER.TEACHER;

          }

          this.user_model.user_name = this.userData.username;

          console.log('SAVING USER DATA', this.user_model)
          this.userService.saveUserData(this.user_model).subscribe((result) => {
            console.log('save user information', result);
            if (result.body["status"] == "Success") {
              this.storage.set("kidder_user", {
                user_username: result.body["user_username"],
                user_name: result.body["user_name"],
                user_password: result.body["user_password"],
                user_id: result.body["user_id"],
                user_fb_id: result.body["user_fb_id"],
                user_fb_pic: result.body["user_fb_pic"],
                user_type: result.body["user_type"],
                user_token: result.body["user_token"],
                uniqueCode: result.body["uniqueCode"],
              });
              console.log('Fomr submitted');
              this.storageService.changeStorageValue(result.body);
              this.modalCtrl.dismiss(result.body);

            } else if (result.body["status"] == "Failed" && result.body["error"] != "Username already exits") {
              this.username_error_flg = true;
              this.error_message = result.body["error"];

            }
            if (this.disableUserType == true) {
              this.modalCtrl.dismiss(result.body);

            }

          })
        }, err => {
          console.log('error while login')
        })
      }
      // get token from local storage








    }


    //  this.presentToast();

  }

  login() {
    if (this.login_user_username && this.login_user_password) {
      this.userService.loginUser(this.login_user_username, this.login_user_password).subscribe((result) => {
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
          this.error_message = result["error"];
          console.log('Login failed');
        }

        if (this.username != null) {
          this.modalCtrl.dismiss(result);

        }

      })


    }
  }



  close() {
    this.modalCtrl.dismiss(null);
  }
  setUserData() {

    if (this.myform.value.re_user_password != this.myform.value.user_password) {
      this.error_message = "Password not matches";
      this.password_error_flag = true;
      return false;
    } else {
      this.user_model = new userModel();
      this.user_model.user_name = this.myform.value.user_name;
      this.user_model.user_username = this.myform.value.user_username;
      this.user_model.user_password = this.myform.value.user_password;
      this.username = this.user_model.user_username;

      return this.user_model;
    }

  }

  SelectTab(tab) {
    this.selectedTab = tab;


  }



}
