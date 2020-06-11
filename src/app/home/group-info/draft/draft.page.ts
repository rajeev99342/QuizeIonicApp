import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SetSelectedGroup } from '../staticData/GroupInfo';
import { NavController, NavParams, PopoverController, ModalController } from '@ionic/angular';
import { GroupModel } from 'src/app/models/GroupModel';
import { DraftService } from './draft.service';
import { QuizModel } from '../create-quiz/models/QuizModel';
import * as moment from 'moment'; 
import { Storage } from '@ionic/storage';
import { userModel } from '../../user/userModel';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.page.html',
  styleUrls: ['./draft.page.scss'],
})
export class DraftPage implements OnInit,OnChanges {

  userObject : userModel;
  draftTest : QuizModel[]=[];
  selectedGroup : GroupModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private route: ActivatedRoute,
    private draftService:DraftService, 
    private storage :Storage,

    private router : Router,) { 
    this.selectedGroup = navParams.data['group'];
    console.log('Graft',this.selectedGroup)
  }

  ngOnInit() {
    // console.log('GROUP ID IS ',this.groupId)
    console.log('GROUP ID ',SetSelectedGroup.selectedGroup)
    this.draftService.getDraftService(this.selectedGroup.grp_id).subscribe((res : QuizModel[])=>{
        if(res)
        {
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

  ngOnChanges()
  {
      console.log('CHAGNES');
  }

  doRefresh(event)
  {
      console.log('Begin async operation');

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

}
