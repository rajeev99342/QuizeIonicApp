import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';
import { UserQuestionModel } from './models/QuestModel';
import { QuizService } from 'src/app/services/quiz.service';
import { PopoverController, NavParams } from '@ionic/angular';
import { QuestSettingPage } from './quest-setting/quest-setting.page';
import { QuizModel } from './models/QuizModel';
import { QuizDetailModel } from './models/QuizDetailModel';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from 'src/app/models/GroupModel';
import { userModel } from '../../user/userModel';
import { Storage } from '@ionic/storage';
import { ImageInfoModel } from './models/ImageInfoModel';
import { TestRoomService } from '../service/testroom.service';
import { ImageModalPage } from '../../image-modal/image-modal.page';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.page.html',
  styleUrls: ['./create-quiz.page.scss'],
})
export class CreateQuizPage implements OnInit {


  sliderOpts={
    zoom:false,
  }

  questionList : UserQuestionModel[] = [];
  username : string ="dummyUser";
  grp_name : string = "dummyGrp";
  quiz_name : string = "dummy Quiz"
  cities2 : any = [];
  selectedFriendsArray : any = [];
  examList : any[] = [];
  selectedExamList : any[]= [];

  subjectList : any[]=[];
  selectedSubjectList : any[]=[];

  topicList : any[]=[];
  selectedTopicList : any[]=[];

  popOverSetting : any;
  userObject : userModel;
  selectedGroup : GroupModel;
  testRoom : QuizModel;
  isAdmin : boolean = false;
  isTestRoomCreator : boolean = false;

  constructor(
    private router : Router,
    private testRoomService: TestRoomService,
    private storage :Storage,
    private activateRoute : ActivatedRoute,
    private quizService : QuizService,
    private popOverController : PopoverController,
    public modalController: ModalController) {

      
    
  }

  ngOnInit() {

    let createQuizModel : any ={};

    this.activateRoute.queryParams.subscribe(params => {
      if (params.groupRoomInfo) {

          createQuizModel = JSON.parse(params.groupRoomInfo);
        if(createQuizModel.selectedGroup)
        {
       
          this.selectedGroup = createQuizModel.selectedGroup;
          this.storage.get("kidder_user").then((admin:userModel)=>{
            if(admin.user_username == this.selectedGroup.grp_admin)
            {
                this.isAdmin=true;
            }
        })
          console.log('selected goup',this.selectedGroup)
        }
        if(createQuizModel.room)
        {
          this.testRoom = createQuizModel.room;
          this.storage.get("kidder_user").then((admin:userModel)=>{
            if(admin.user_username == this.testRoom.userModel.user_username)
            {
                this.isTestRoomCreator = true;
            }
        })

          this.testRoomService.getQuestions(this.testRoom.quiz_id).subscribe((res:UserQuestionModel[])=>{
               console.log('Hi this is questions',res);
               this.questionList = res;

        })
        }else{
          this.isTestRoomCreator = true;
        }
       
      }
    });



    this.storage.get('kidder_user').then((userData)=>{
      if(userData)
      {
          this.userObject = userData;
        
      }
  })
    
  }



  async addYourOwnQuestioin(questObject)
  {
      const modal = await this.modalController.create({
        component: AddImageQuestionPage,
        backdropDismiss:false,
        cssClass : 'custom-ques-modal',
        componentProps:{
            questObject : questObject
        }

      });

      modal.onDidDismiss().then(dataRetured=>{
          if(dataRetured.data == false)
          {
              console.log('cancel adding question by user')
          }else
          {
              if(dataRetured.data.isEdit)
              {

                  console.log('before update',this.questionList)
                  let index = this.questionList.indexOf(questObject);
                  this.questionList.splice(index,1);
                  this.questionList[index] = dataRetured.data;

                  console.log('updated questino',this.questionList);
              }else{

                let userQuesModel : UserQuestionModel = new UserQuestionModel();

                let imageInfoModel : ImageInfoModel = new ImageInfoModel();

                imageInfoModel.img_base64 = dataRetured.data.imgInfoTbls[0].img_base64;
                imageInfoModel.img_desc = dataRetured.data.imgInfoTbls[0].img_desc;
                imageInfoModel.img_id = dataRetured.data.imgInfoTbls[0].img_id;
                imageInfoModel.img_path = dataRetured.data.imgInfoTbls[0].img_path;
                imageInfoModel.uniqueCode = dataRetured.data.imgInfoTbls[0].uniqueCode;
                imageInfoModel.toBeDeleted = false;
                let imgs : ImageInfoModel[]=[];
                imgs.push(imageInfoModel);

                userQuesModel.imgInfoTbls = imgs;
                userQuesModel.userInfoTbl = this.userObject;

                userQuesModel.user_quest_ans = dataRetured.data.user_quest_ans;
                userQuesModel.user_quest_marks = dataRetured.data.user_quest_marks
                userQuesModel.user_quest_optionA = dataRetured.data.user_quest_optionA
                userQuesModel.user_quest_optionB = dataRetured.data.user_quest_optionB
                userQuesModel.user_quest_optionC = dataRetured.data.user_quest_optionC
                userQuesModel.user_quest_optionD = dataRetured.data.user_quest_optionD

                this.questionList.push(userQuesModel);



              }
              console.log('question added')
          }
      })
      return await modal.present();
    
  }


  saveQuizWithQuest()
  {
      // if(this.questionList.length == 0)
      // {
      //     console.log('please add atleast 5 question')
      // }else{


      //   let quiz_model : QuizModel = this.getQuizModel();
      //   if(quiz_model != null)
      //   {

      //       console.log('save quiz model',quiz_model)
      //       this.quizService.saveQuizModel(this.questionList,quiz_model).subscribe((response)=>{
      //           console.log(response);
      //       })
      //   }
          
      // }
  }

  getQuizModel()
  {
    let quiz_model : QuizModel = new QuizModel();
    quiz_model.quiz_created_date = null;
    quiz_model.quiz_duration = 5; // min
    quiz_model.quiz_marks = 5;
    quiz_model.quiz_name = this.quiz_name;
    quiz_model.quiz_num_of_ques = this.questionList.length;
    quiz_model.quiz_published_date = null; // server side
    if(this.testRoom && this.testRoom.quiz_id)
    {
      quiz_model.quiz_id = this.testRoom.quiz_id;

    }
    quiz_model.userModel = this.userObject;
    quiz_model.grpModel = this.selectedGroup;
    quiz_model.quiz_time = null;
    return quiz_model;
  }
  EditQustion(questModel)
  {

      questModel.isDelete = false;
      questModel.isEdit = true;
      this.addYourOwnQuestioin(questModel);   
  }
  async openQuestionSetting(ev: any) {
    // let obj  = Object.assign({},this.questionList[ev]);
    const popOverSetting = await this.popOverController.create({
      component: QuestSettingPage,
      event: ev,
     cssClass:'custom-setting',
     componentProps:{
      questObject :ev
     }
      
    });

    popOverSetting.onDidDismiss().then((returedData)=>{
        console.log('delete or edit',returedData)
        if(returedData.data && returedData.data.isEdit)
        {
            this.addYourOwnQuestioin(returedData.data);   
            console.log('Edit this model');
        }else if(returedData.data && returedData.data.isDelete)
        {
            let index = this.questionList.indexOf(returedData.data);
            if(index > -1)
            {
                this.questionList.splice(index,1);
            }
            console.log('delete this model')
        }
    })
    return await popOverSetting.present();
  }


  saveTestRoom()
  {
    if(this.questionList.length == 0)
    {
        console.log('slkdfjls')
    }else{


      let quiz_model : QuizModel = this.getQuizModel();
      if(quiz_model != null)
      {
        let quizDetails : QuizDetailModel = new QuizDetailModel();
        quizDetails.questions = this.questionList;
        quizDetails.quizModel  = quiz_model;
          console.log('save quiz model',quiz_model)
          this.quizService.saveQuizModel(quizDetails).subscribe((response:QuizModel)=>{
              console.log(response);
             if(response["status"] == "Success")
             {
                this.router.navigate(['/group-info',{grp:response.grpModel}]);
             }
              
          })
      }
        
    }
  }

  openPreview(img)
  {
      this.modalController.create({
        component:ImageModalPage,
        componentProps:{
          img : img
        }
      }).then(modal=>modal.present());
  }

}
