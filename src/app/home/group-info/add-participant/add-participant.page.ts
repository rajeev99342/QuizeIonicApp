import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/service/user.service';
import { userModel } from '../../user/userModel';
import { PopoverController, NavParams, ModalController } from '@ionic/angular';
import { GroupModel } from 'src/app/models/GroupModel';
import { GroupParticipantModel } from './groupPartiModet';
import { NotificationService } from '../../notifications/notification.service';

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
  participants : userModel [] = [];
  groupInfo : GroupModel;
  selectedGroup : GroupModel;

  user : userModel;
  constructor(
    private modalController : ModalController,
    private navParams: NavParams,
    private notification : NotificationService,
    private userService : UserService) { 
    this.selectedGroup = navParams.data['groupInfo'].group;
      this.participants = navParams.data['groupInfo'].participant
    }

  ngOnInit() {
    console.log('Graft',this.selectedGroup)
  }


  validateUsername()
  {
      if(this.usernameKey == this.selectedGroup.grp_admin)
      {
          return false;
      }else{
        const memes =   this.participants.filter((mem : userModel)=>{
              this.usernameKey == mem.user_username
          })

          if(memes.length == 0)
          {
              return true;
          }else{
              return false;
          }
      }



  }


  searchParticipant()
  {

     if(this.validateUsername())
     {
        console.log('valid')
     }else{
        console.log('this is a memeber of you group');
        return;
     }
    
      this.userService.getUserByUsername(this.usernameKey).subscribe((response:userModel)=>{
          console.log("searched user",response);
          if(response == null)
          {
              console.log('user not found');
              return;
          }
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

     groupPartiModel.groupModel = this.selectedGroup;
     groupPartiModel.userModel = this.user;
     groupPartiModel.isAdmin = 0;

    this.userService.addGroupParticipant(groupPartiModel).subscribe((res)=>{
        console.log('saved data',res);
        if(res)
        {
            // call notification service
            this.notification.addParticipantNotification(this.user.user_token).subscribe((res)=>{
                console.log('Sent notification successfully')
            })

        }
    },err=>{

    })

  }


  onTypeUsername()
  {
      if(this.usernameKey == null || this.usernameKey.length == 0)
      {
          this.isFound == false;
      }
  }


  onKeyupUsername()
  {
    if(this.usernameKey == null || this.usernameKey.length == 0)
    {
        this.isFound == false;
    }
  }

  
  
close()
{
    this.modalController.dismiss();
}  


}
