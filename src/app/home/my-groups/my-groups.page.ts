import { Component, OnInit } from '@angular/core';
import { SubjectListPage } from '../subject-list/subject-list.page';
import { userModel } from '../user/userModel';
import { GroupModel } from 'src/app/models/GroupModel';
import { StorageService } from '../storage.service';
import { GroupService } from '../group-info/service/group.service';
import { NavParams, ModalController } from '@ionic/angular';
import { SharedTabService } from '../sharedTabService';
import { NavigationExtras, Router } from '@angular/router';
import {CreateGroupPage} from '../create-group/create-group.page'

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.page.html',
  styleUrls: ['./my-groups.page.scss'],
})
export class MyGroupsPage implements OnInit {

  selectedImage: string;
  imageText: string;

  selectedValue: any;
  subjectListPage: SubjectListPage;
  popover: any;
  popoverForCreateGroup: any;
  authenticated: boolean = true;
  groupCreatedByYou: boolean = false;
  fcm_token: string;
  userObject: userModel;
  groupList: GroupModel[] = [];

  username: string;
  dummyUser: string;


  constructor(

    private storageService: StorageService,
    private sharedTabService: SharedTabService,
    public navParams: NavParams,
    private router : Router,
    private modalCtrl : ModalController,
    public groupService: GroupService) {



      this.storageService.loutoutStorage.subscribe(newValue=>{
        if(newValue == null)
        {
            this.authenticated = false;
            this.groupList = [];
            this.userObject = null;
        }
    })

    
  
      this.sharedTabService.changedOneToSecondTab.subscribe(newUserObject => {
        if(newUserObject)
        {
          this.userObject = newUserObject;
          this.getGroupByUserId();
        }else{
          this.userObject = null;
          this.groupList = [];
        }
 
  
      })
    



  }

  ngOnInit() {
  }



  getGroupByUserId() {

    this.groupService.getGroupByUserId(this.userObject.user_id).subscribe((response: GroupModel[]) => {
      console.log('getting all group', response);
      this.groupList = response;
      this.groupList = this.groupList.filter((grp)=>grp.grp_admin == this.userObject.user_username);
    })
  }


  onClickGroup(group: GroupModel) {
    console.log('ON CLICK GROUP INFORMATION', group);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        group: JSON.stringify(group)
      }
    };
    console.log('go to subject list', group);
    this.router.navigate(['/group-info'], navigationExtras);
  }


  async createGroup(ev: any) {
    this.popoverForCreateGroup = await this.modalCtrl.create({
      component: CreateGroupPage,
      // cssClass: 'custom-css-signUp-popover',
      animated: true,
      showBackdrop: true,

    });
    this.popoverForCreateGroup.onDidDismiss().then(dataReturned => {
      if (dataReturned.data != false) {
        this.groupCreatedByYou = true;
      } else {
        console.log('failed', dataReturned.data);
      }
    });
    return await this.popoverForCreateGroup.present();
  }
}
