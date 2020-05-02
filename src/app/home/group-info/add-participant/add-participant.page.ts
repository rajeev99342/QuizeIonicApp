import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { userModel } from '../../user/userModel';
import { PopoverController, NavParams } from '@ionic/angular';
import { GroupModel } from 'src/app/models/GroupModel';
import { GroupParticipantModel } from './groupPartiModet';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.page.html',
  styleUrls: ['./add-participant.page.scss'],
})
export class AddParticipantPage implements OnInit {

  usernameKey : string;
  user_name : string;
  user_username : string;
  isFound :boolean = false;
  isKeyDown :boolean = false;

  groupInfo : GroupModel;

  user : userModel;
  constructor(
    private pop : PopoverController,
    private navParams: NavParams,

    private userService : UserService) { }

  ngOnInit() {
    this.groupInfo = this.navParams.get('groupInfo');

  }


  searchParticipant()
  {
    
      this.userService.getUserByUsername(this.usernameKey).subscribe((response:userModel)=>{
          console.log("searched user",response);
          if(response["status"] == "Success")
          {
            this.user = response;
            this.isFound = true;
            this.isKeyDown = false;
            this.user_name = response["user_name"];
            this.user_username = response["user_username"];
          }else{
            this.isKeyDown = true;
            this.isFound = false;
          }

      })
  }

  add()
  {

     let groupPartiModel :GroupParticipantModel = new GroupParticipantModel();

     groupPartiModel.groupModel = this.groupInfo;
     groupPartiModel.userModel = this.user;
     groupPartiModel.isAdmin = 0;

    this.userService.addGroupParticipant(groupPartiModel).subscribe((res)=>{
        console.log('saved data',res);
    })

      this.pop.dismiss();
  }

}
