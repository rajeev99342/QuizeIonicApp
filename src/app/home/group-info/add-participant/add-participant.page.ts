import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/service/user.service';

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
  constructor(private userService : UserService) { }

  ngOnInit() {
  }


  searchParticipant()
  {
    
      this.userService.getUserByUsername(this.usernameKey).subscribe((response)=>{
          console.log("searched user",response);
          if(response["status"] == "Success")
          {
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

}
