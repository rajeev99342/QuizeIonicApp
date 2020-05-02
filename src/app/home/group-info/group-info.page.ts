import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ParticipantPage } from './participant/participant.page';
import { PopoverController } from '@ionic/angular';
import { QuizeInfoPage } from './quize-info/quize-info.page';
import { AddParticipantPage } from './add-participant/add-participant.page';
import { ParticipantRequestListPage } from './participant-request-list/participant-request-list.page';
import { GroupModel } from 'src/app/models/GroupModel';
import { TestRoomService } from './service/testroom.service';
import { QuizModel } from './create-quiz/models/QuizModel';
import { userModel } from '../user/userModel';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.page.html',
  styleUrls: ['./group-info.page.scss'],
})
export class GroupInfoPage implements OnInit {

  popoverParticipant : any;
  popoverQuizInfo : any;

  popoverAddParticipant : any;
  participantList : any;
  selectedGroup : GroupModel;
  popoverParticipantRqstList : any;
  testRoomList : QuizModel[] = [];
  cities2 : any = [];
  isAdmin : boolean = true;
  user : userModel;
  
  constructor(
    private storage : Storage,
    private testRoomService:TestRoomService,
    private activateRoute : ActivatedRoute,
    private popoverController: PopoverController, private router : Router) { 




  }

  ngOnInit() {

    this.activateRoute.queryParams.subscribe(params => {
      if (params && params.group) {
        this.selectedGroup = JSON.parse(params.group);
        console.log('selected goup',this.selectedGroup)
        this.storage.get("kidder_user").then((user:userModel)=>{
          this.user = user;
            if(user.user_username != this.selectedGroup.grp_admin)
            {
                
                this.isAdmin = false;
            }
        })
        this.testRoomService.getTestRoomByGroupId(this.selectedGroup.grp_id).subscribe((res:QuizModel[])=>{
          console.log("test room ",res);
          this.testRoomList = res
        
        })

      }
    });


   
    }



      async onClickParticipantQuizeWise(ev: any) {
        
        this.participantList = await this.popoverController.create({
          component: ParticipantPage,
          animated:true,
          showBackdrop: true,
          
         
        });
        this.participantList.onDidDismiss().then(dataReturned => {
          if (dataReturned.data) {
              console.log('Register successfully');
              // this.authenticated= true;
              // this.storageService.changeStorageValue(dataReturned.data);
              
            } else {
              console.log('Register failure');
          }
        });
        return await this.popoverParticipant.present();
      }
    

   async onClickQuizeInfo(ev)
    {
      
      this.popoverQuizInfo = await this.popoverController.create({
        component: QuizeInfoPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverQuizInfo.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
            // console.log('Register successfully');
            // this.authenticated= true;
            // this.storageService.changeStorageValue(dataReturned.data);
            
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverQuizInfo.present();

    }

    onClickCreateQuiz()
    {

      let createQuizInfoModel : any ={};
      createQuizInfoModel.room = null;
      createQuizInfoModel.selectedGroup = this.selectedGroup;

      let navigationExtras: NavigationExtras = {
        queryParams: {
          groupRoomInfo: JSON.stringify(createQuizInfoModel)
        }
      };
      this.router.navigate(['/create-quiz'],navigationExtras);

    }


    async addParticipant()
    {
      
      
            
      this.popoverAddParticipant = await this.popoverController.create({
        component: AddParticipantPage,
        animated:true,
        showBackdrop: true,
        componentProps:{
          groupInfo : this.selectedGroup
      }
       
      });
      this.popoverAddParticipant.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
       
          } else {
            console.log('add group member');
        }
      });
      return await this.popoverAddParticipant.present();
    }

   async participantInThisGroup()
    {
      
            
      this.popoverAddParticipant = await this.popoverController.create({
        component: ParticipantPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverAddParticipant.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
       
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverAddParticipant.present();
    }

   async onClickParticipantRequestList()
    {
            
            
      this.popoverParticipantRqstList = await this.popoverController.create({
        component: ParticipantRequestListPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverParticipantRqstList.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
        
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverParticipantRqstList.present();
    }


    doRefresh(event)
    {
        console.log('Begin async operation');
  
            setTimeout(() => {
              console.log('Async operation has ended');
              event.target.complete();
            }, 200);
    }

    getQuestions(room : QuizModel)
    {

      if(room.userModel.user_username == this.user.user_username)
      {
        let createQuizInfoModel : any ={};
        createQuizInfoModel.room = room;
        createQuizInfoModel.selectedGroup = this.selectedGroup;
        let navigationExtras: NavigationExtras = {
          queryParams: {
            groupRoomInfo: JSON.stringify(createQuizInfoModel)
          }
        };
  
        this.router.navigate(['/create-quiz'],navigationExtras);
      }else{
        console.log('Test room is inactive mode')
      }

  

    }

}
