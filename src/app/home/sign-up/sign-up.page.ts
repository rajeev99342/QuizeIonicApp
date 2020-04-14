import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  // private popoverController: PopoverController
  password_error : string;
  password_error_flag :boolean;
  username : string;
  user_name : FormControl;
  user_username : FormControl;
  user_password : FormControl;
  re_user_password : FormControl;

  user_email : FormControl;
  user_website : FormControl;
  user_referal_threshol : FormControl;
  user_institute :FormControl
  user_address :FormControl
  user_type : FormControl
  user_refer_col :FormControl
  user_refer_from :FormControl
  user_is_Competator :FormControl
  myform: FormGroup;
   user_model: userModel ;
  constructor(private pop : PopoverController,
    private storage : Storage,
    
     private messageEventEmitterService: MesssageServicesService ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls()
  {
        
    this.user_name = new FormControl("", [
      Validators.required
    ]);
    this.user_username = new FormControl("", [
      Validators.required
    ]);
 
    this.user_password = new FormControl("", [
      Validators.required
    ]);

    this.re_user_password = new FormControl("",[Validators.required]);

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

  createForm()
  {
    this.myform = new FormGroup({
      user_name: this.user_name,
      user_username: this.user_username,
      user_password : this.user_password,
      re_user_password :this.re_user_password
      // mfstBatchSize : this.mfstBatchSize
    });
  }

  async register(form) {
    console.log(form);

    if(this.setUserData() == false)
    {
        console.log('Password not matches')
    }else
    {
  
      this.storage.set("kidder_user",this.username);
      console.log('Fomr submitted');
      
       await this.pop.dismiss(this.username);
    }
    
  
    //  this.presentToast();
        
  }

  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'User was added successfully',
  //     duration: 3000,
  //     position: 'top'
  //   });
  
  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });
  
  //   toast.present();
  // }

  setUserData()
  {

    if(this.myform.value.re_user_password != this.myform.value.user_password)
    {
      this.password_error = "Password not matches";
      this.password_error_flag = true;
      return false;
    }else
    {
      this.user_model = new userModel();
      this.user_model.user_name = this.myform.value.user_name;
      this.user_model.user_username = this.myform.value.user_username;
      this.user_model.user_password = this.myform.value.user_password;
      this.username = this.user_model.user_username;

      return this.user_model;
    }



  }

}
