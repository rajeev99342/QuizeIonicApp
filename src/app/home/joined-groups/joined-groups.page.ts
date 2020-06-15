import { Component, OnInit } from '@angular/core';
import { userModel } from '../user/userModel';
import { GroupModel } from 'src/app/models/GroupModel';
import { SubjectListPage } from '../subject-list/subject-list.page';
import { Storage } from '@ionic/storage';
import { GroupService } from '../group-info/service/group.service';

import { StorageService } from '../../home/storage.service'
import { NavigationExtras, Router } from '@angular/router';
import { SharedTabService } from '../sharedTabService';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-joined-groups',
  templateUrl: './joined-groups.page.html',
  styleUrls: ['./joined-groups.page.scss'],
})
export class JoinedGroupsPage implements OnInit {


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
    private router: Router,

    public groupService: GroupService) {


    this.storageService.loutoutStorage.subscribe(newValue => {
      if (newValue == null) {
        this.authenticated = false;
        this.groupList = [];
        this.userObject = null;
      }
    })

  
      this.sharedTabService.changedValueObserver.subscribe(newUserObject => {

        if(newUserObject)
        {
          this.userObject = newUserObject;
          this.sharedTabService.changeOneToSecond(this.userObject);
  
          this.getGroupByUserId();
        }else{
            this.userObject = null;
            this.groupList = [];
            this.authenticated = false;
            this.fcm_token = null;
            this.sharedTabService.changeOneToSecond(null);

        }

  
      })
    




  }

  ngOnInit() {
  }



  getGroupByUserId() {

    this.groupService.getGroupByUserId(this.userObject.user_id).subscribe((response: GroupModel[]) => {
      console.log('getting all group', response);
      this.groupList = response;
      this.groupList = this.groupList.filter((grp) => grp.grp_admin != this.userObject.user_username);

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


}
