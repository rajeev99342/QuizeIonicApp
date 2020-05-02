import { Component, OnInit } from '@angular/core';
import {SubjectListPage} from './subject-list/subject-list.page';
import { Router ,ActivatedRoute, NavigationExtras} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SubjectConfirmPage } from './subject-confirm/subject-confirm.page';
import { PopoverController } from '@ionic/angular';
import { MesssageServicesService } from './services/messsage-services.service';
import { SignUpPage } from './sign-up/sign-up.page';
import { CreateGroupPage } from './create-group/create-group.page';
import { UserInfo } from './constants/userInfo';
import { Storage } from '@ionic/storage';
import { HomeApiServiceService } from './services/home-api-service.service';
import { StorageService } from './storage.service';
import { AppService } from '../services/app.service';
import { GroupModel } from '../models/GroupModel';
import { GroupService } from './group-info/service/group.service';
import { userModel } from './user/userModel';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cities2: City[];
  selectedCity2: City;
  selectedValue : any;
  subjectListPage : SubjectListPage;
   popover : any;
   popoverForCreateGroup: any;
   authenticated : boolean = false;
   groupCreatedByYou : boolean = false;
   fcm_token : string;
  userObject : userModel;
   groupList : GroupModel[] = [];
username : string;
  constructor(
    private activateRoute:ActivatedRoute,
    public groupService : GroupService,
    public popoverController: PopoverController,
    private messageService : MesssageServicesService,
    private homeApiServiceService :HomeApiServiceService,
    public modalController: ModalController,
    private router : Router,
    private appService :AppService,
    private storageService:StorageService,
    private storage : Storage
    ) {

      this.storageService.loutoutStorage.subscribe(newValue=>{
          if(newValue == null)
          {
              this.authenticated = false;
              this.groupList = [];
          }
      })
     }

  ngOnInit() {

    
    console.log('TTHIS IS BASE URL',this.appService.getBaseURL())
  


    // this.getGroupByAdmin();
    
    this.getGroupByUserId();

     this.storage.get("fcm_token").then((token)=>{
      this.fcm_token = token;
    })

  }

  getGroupByUserId()
  {
    this.storage.get('kidder_user').then((userData:userModel)=>{
      if(userData)
      {
          this.userObject = userData;
          this.username = userData.user_username;
          this.authenticated = true;
          this.groupService.getGroupByUserId(this.userObject.user_id).subscribe((response : GroupModel[])=>{
            console.log('getting all group',response);
            this.groupList = response
          })
      }
  })
  }

  getGroupByAdmin(){
    this.storage.get('kidder_user').then((userData)=>{
      if(userData)
      {
          this.userObject = userData;
          this.username = userData.user_username;
          this.authenticated = true;
          this.groupService.getAllGrpByAdmin(this.userObject.user_username,true).subscribe((response : GroupModel[])=>{
            console.log('getting all group',response);
            this.groupList = response
          })
      }
  })
  }

  onChangeClass(event)
  {
      console.log('selected class is',this.selectedValue)
  }

  // onClickNext()
  // {
  //     console.log('hi this is next');
  //     // this.navCtrl.push(SubjectListPage);
  // }
    
  onClickGroup(group)
  {

    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        group: JSON.stringify(group)
      }
    };
    console.log('go to subject list',group);
    this.router.navigate(['/group-info'],navigationExtras);

  }


  async OpenSignUpPopUP(ev: any) {
    this.popover = await this.popoverController.create({
      component: SignUpPage,
      event: ev,
      animated:true,
     
      cssClass:'sign-up-custom-popover'
     
    });
    this.popover.onDidDismiss().then(dataReturned => {
      if (dataReturned.data) {
          console.log('Register successfully');
          this.authenticated= true;
          this.getGroupByAdmin();
          this.storageService.changeStorageValue(dataReturned.data);
          
        } else {
          console.log('Register failure');
      }
    });
    return await this.popover.present();
  }

  dismiss()
  {
    
      this.messageService.onFirstComponentButtonClick(this.popover);
  }

  async createGroup(ev: any)
  {
    this.cities2 = [];
    this.popoverForCreateGroup = await this.popoverController.create({
      component: CreateGroupPage,
      cssClass : 'custom-css-signUp-popover',
      event: ev,
      animated:true,
      showBackdrop: true,
     
    });
    this.popoverForCreateGroup.onDidDismiss().then(dataReturned => {
      if (dataReturned.data != false) {
          this.groupCreatedByYou = true;
          this.cities2.push({name: 'New York', code: 'NY'})
        } else {
          console.log('failed',dataReturned.data);
      }
    });
    return await this.popoverForCreateGroup.present();
  }


  doRefresh(event)
  {
      console.log('Begin async operation');

      if(this.userObject != null && this.userObject.user_username != null)
      {
        this.groupService.getGroupByUserId(this.userObject.user_id).subscribe((response : GroupModel[])=>{
          console.log('getting all group',response);
          this.groupList = response
        })
            setTimeout(() => {
              console.log('Async operation has ended');
              event.target.complete();
            }, 200);
      }
  
  }
}

