import { Component, OnInit } from '@angular/core';
import { GroupService } from '../home/group-info/service/group.service';
import { GroupModel } from '../models/GroupModel';
import { Storage } from '@ionic/storage';
import { userModel } from '../home/user/userModel';

@Component({
  selector: 'app-explore-groups',
  templateUrl: './explore-groups.page.html',
  styleUrls: ['./explore-groups.page.scss'],
})
export class ExploreGroupsPage implements OnInit {

  cities2 : any = [];
  groupList : GroupModel[] = [];
  userObject : userModel;
  constructor(
    private storage : Storage,
    private groupService : GroupService
    ) { }

  ngOnInit() {

    
    this.storage.get("kidder_user").then((user)=>{
    
      this.groupService.getAllGrpByAdmin(user.user_username,false).subscribe((response : GroupModel[])=>{
        console.log('getting all group',response);
        this.groupList = response
      })
    })

  }

  filterGroup(ent)
  {
      this.ngOnInit();
      const searchItem = ent.srcElement.value;
      if(!searchItem)
      {
          return;
      }
      this.cities2 = this.cities2.filter((val)=>{
          if(val.name && searchItem)
          {
              if(val.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1)
              {
                  return true;
              }else{
                return false;
              }
          }
      })

  }

}
