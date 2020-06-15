import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupInfoPage } from '../group-info.page';
import { TestRoomService } from '../service/testroom.service';
import { NavParams } from '@ionic/angular';
import { GroupModel } from 'src/app/models/GroupModel';
import { DraftService } from '../draft/draft.service';
import { QuizModel } from '../create-quiz/models/QuizModel';
import * as moment from 'moment'; 
import { userModel } from '../../user/userModel';
import { Storage } from '@ionic/storage';
import {TestStatus} from '../../constants/kidderTestStatus'
import { NavigationExtras, Router } from '@angular/router';
import { DraftPage } from '../draft/draft.page';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {



  draftTest : QuizModel[]=[];
  userObject : userModel;
  isLoading : boolean = false;
  selectedGroup : GroupModel;
  isTestCreator : boolean = false;
  cities2 : any = [];
  constructor(   
    private navParams : NavParams,
    private draftService:DraftService, 
    private storage :Storage,
    private router : Router,
     private testRoomService:TestRoomService ) {
      this.selectedGroup = navParams.data['group'];
   
      }

  ngOnInit() {
    this.isLoading = true;
    this.draftService.getDraftService(this.selectedGroup.grp_id).subscribe((res : QuizModel[])=>{
      if(res)
      {
          this.draftTest = res;

          this.draftTest.forEach(element => {
            if(element.quizStatus == 1 || element.quizStatus == 0)
            {
              element["created_string_date"] = moment(element.quizCreatedDate).format('MMMM Do YYYY,h:mm A');
              element["publish_string_date"] = moment(element.quizPublishedDate).format('MMMM Do YYYY,h:mm A');

            }
     
          });
          this.draftTest.sort((a, b) => (a.quizCreatedDate < b.quizCreatedDate) ? 1 : -1)

          console.log('Draft Test',this.draftTest)

          this.getUser().then((val)=>{
              if(val == 'done')
              { 
                  this.isLoading = false;
                  console.log('done')
              }
          });

      }
  })
    this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }

  getUser()
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.get('kidder_user').then((userData)=>{
          if(userData)
          {
              this.userObject = userData;
              resolve('done')
          }
      })
      }, 1000);
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

  startTest(quiz : QuizModel)
  {
    this.draftService.startTest(quiz).subscribe((res :QuizModel)=>{

    })
  }



  doRefresh(event)
  {
      console.log('Begin async operation');
    this.getRefreshedData(event);

  
  }

  getRefreshedData(event)
  {
    this.draftService.getDraftService(this.selectedGroup.grp_id).subscribe((res : QuizModel[])=>{
      if(res)
      {
        setTimeout(() => {
          console.log('Async operation has ended');
          event.target.complete();
        }, 1000);
          this.draftTest = res;

          this.draftTest.forEach(element => {
            element["created_string_date"] = moment(element.quizCreatedDate).format('MMMM Do YYYY,h:mm A');
            element["publish_string_date"] = moment(element.quizPublishedDate).format('MMMM Do YYYY,h:mm A');

          });
          this.draftTest.sort((a, b) => (a.quizCreatedDate < b.quizCreatedDate) ? 1 : -1)

          console.log('Draft Test',this.draftTest)

          this.getUser().then((val)=>{
              if(val == 'done')
              {
                  console.log('done')
              }
          });

      }
  })
  }
  onClickEdit(quiz: QuizModel )
  {
    let createQuizInfoModel : any ={};
    quiz.userModel = this.userObject;
    createQuizInfoModel.room = quiz;

    createQuizInfoModel.selectedGroup = this.selectedGroup;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupRoomInfo: JSON.stringify(createQuizInfoModel)
      }
    };
    this.router.navigate(['/create-quiz'],navigationExtras);

  }

  onClickMoveToDraft(quiz: QuizModel)
  {
    this.draftService.makeItPublic(quiz,TestStatus.TEST_IN_DRAFT).subscribe((res :QuizModel)=>{
      if(res["body"].status)
      {
          this.getRefreshedData(event);
          console.log('successfully published');


      }
  })
  }


}
