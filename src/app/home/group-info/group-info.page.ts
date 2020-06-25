import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ParticipantPage } from './participant/participant.page';
import { PopoverController, ModalController } from '@ionic/angular';
import { QuizeInfoPage } from './quize-info/quize-info.page';
import { AddParticipantPage } from './add-participant/add-participant.page';
import { GroupModel } from 'src/app/models/GroupModel';
import { TestRoomService } from './service/testroom.service';
import { QuizModel } from './create-quiz/models/QuizModel';
import { userModel } from '../user/userModel';
import {UpcomingPage} from './upcoming/upcoming.page'
import { Storage } from '@ionic/storage';
import * as moment from 'moment'; 

import { ParticipantRequestListPage } from './participant-request-list/participant-request-list.page';
import { CompletedPage } from './completed/completed.page';

import {DraftPage} from './draft/draft.page'
import { SetSelectedGroup } from './staticData/GroupInfo';
import { GroupDetailsModel } from './groupDetailModel';
import { GroupService } from './service/group.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.page.html',
  styleUrls: ['./group-info.page.scss'],
})
export class GroupInfoPage implements OnInit,OnChanges {


  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("HHHHHHHHHHHHh")
  }

  selectedTab = 0;

  popoverParticipant : any;
  popoverQuizInfo : any;

  addParticipantModel : any;
  participantList : any;
  selectedGroup : GroupModel;
  popoverParticipantRqstList : any;
  testRoomList : QuizModel[] = [];
  cities2 : any = [];
  isAdmin : boolean = true;
  user : userModel;
  participantPage=ParticipantPage;
  participantRequestListPage=ParticipantRequestListPage;  
  completedPage=CompletedPage;  
  upcomingPage = UpcomingPage;
  draftPage = DraftPage;


  groupDetailsModel : GroupDetailsModel = new GroupDetailsModel();

  constructor(
    private route: ActivatedRoute,
    private storage : Storage,
    private groupService : GroupService,
    private testRoomService:TestRoomService,
    private activateRoute : ActivatedRoute,
    private popoverController: PopoverController, 
    private modalController : ModalController,
    private router : Router,
  ) { 




  }

  ngOnInit() {

    if(this.route.snapshot.paramMap.get('grp'))
    {
      console.log(this.route.snapshot.paramMap.get('grp'));
    }

    this.activateRoute.queryParams.subscribe(params => {
      if (params && params.group) {
        this.selectedGroup = JSON.parse(params.group);
        SetSelectedGroup.selectedGroup = (this.selectedGroup);
        this.getTestRooms();
      }
    });


   
    }




  getTestRooms()
  {
    console.log('selected goup',this.selectedGroup)
    this.storage.get("kidder_user").then((user:userModel)=>{
      this.user = user;
        if(user.user_username != this.selectedGroup.grp_admin)
        {
            
            this.isAdmin = false;
        }
    })

    this.testRoomService.getTestRoomByGroupIdAndUsersByGroupId(this.selectedGroup.grp_id).subscribe((res:GroupDetailsModel)=>{
      console.log("test room ",res);
     this.groupDetailsModel = res;
     this.testRoomList = this.groupDetailsModel.quizList;

      this.testRoomList.forEach(element => {
          element.quiz_created_date_string = moment(element.quizCreatedDate).format('MMMM Do YYYY');
          if(element.quizPublishedDate){
            element.quiz_publish_date_string = moment(element.quizPublishedDate).format('MMMM Do YYYY HH:MM:ss a');

          }else{ 
          
              element.quiz_publish_date_string = ""

          }

          // if(element.quiz_status == 0)
          // {
          //   element.quiz_status_s = "Not stared"
          // }else if(element.quiz_status == 1)
          // {
          //   element.quiz_status_string = "Live"

          // }else{
          //   element.quiz_status_string = "Ended"

          // }
      });

      this.testRoomList.sort((a, b) => a.quizCreatedDate > b.quizCreatedDate ? -1 : a.quizCreatedDate < b.quizCreatedDate ? 1 : 0)

    
    })

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
      
      
            
      this.addParticipantModel = await this.modalController.create({
        component: AddParticipantPage,
        animated:true,
        showBackdrop: true,
        cssClass: 'my-custom-add-member-modal-css',
        componentProps:{
          groupInfo : this.selectedGroup
      }
       
      });
      this.addParticipantModel.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
       
          } else {
            console.log('add group member');
        }
      });
      return await this.addParticipantModel.present();
    }

   async participantInThisGroup()
    {
      
            
      this.addParticipantModel = await this.popoverController.create({
        component: ParticipantPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.addParticipantModel.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
       
          } else {
            console.log('Register failure');
        }
      });
      return await this.addParticipantModel.present();
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

        if(room.quizStatus == 1)
        {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              roomInfo: JSON.stringify(room)
            }
          };
          this.router.navigate(['/live-test'],navigationExtras)
        }

        console.log('Test room is inactive mode')
      }

  

    }


    startTest(room : QuizModel)
    {
        console.log('this is room to start',room);
        this.testRoomService.startTest(room).subscribe((res)=>{
            console.log('test started',res);
            if(res.body["status"] == "Success"){
                let duration = res.body["quiz_duration"];
                duration = duration * 60 * 1000;
                setTimeout(() => {
                  this.testRoomService.endTest(room).subscribe((response)=>{
                      console.log('test ended');
                  })
                }, duration);
            }
        })
    }


    changeUpcomingFunction()
    {
        console.log('CHANGING UPCOMING FUNCTION');
    }

    onClickLeaveGroup()
    {
        this.groupService.removeUserOrLeaveGroup(this.user.user_username,this.selectedGroup.grp_id,"PARTICIPANT").subscribe((res)=>{
            if(res.body == true)
            {
                console.log('PARTICIPANT REMOVED');
            }else{
                console.log('NOT ABLE TO REMOVE PARTICIPANT');
            }
        })
    }

}
