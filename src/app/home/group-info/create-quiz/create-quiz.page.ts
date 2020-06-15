import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';
import { UserQuestionModel } from './models/QuestModel';
import { QuizService } from 'src/app/services/quiz.service';
import { PopoverController, NavParams } from '@ionic/angular';
import { QuestSettingPage } from './quest-setting/quest-setting.page';
import { QuizModel } from './models/QuizModel';
import { QuizDetailModel } from './models/QuizDetailModel';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GroupModel } from 'src/app/models/GroupModel';
import { userModel } from '../../user/userModel';
import { Storage } from '@ionic/storage';
import { ImageInfoModel } from './models/ImageInfoModel';
import { TestRoomService } from '../service/testroom.service';
import { ImageModalPage } from '../../image-modal/image-modal.page';
import { TxtQuesInfoModel } from './models/TxtQuesInfoModel';


import {KiKidderQuestModel} from './models/KiKidderQuestModel'
import { DgrmImageInfoModel } from './models/DgrmImageInfoModel';
import { KidderQuestionModel } from './models/KidderQuestionModel';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.page.html',
  styleUrls: ['./create-quiz.page.scss'],
})
export class CreateQuizPage implements OnInit {


  sliderOpts={
    zoom:false,
  }

  quizPoints : number;
  durationError : boolean ;
  testStartDateError : boolean ;
  quizNameError : boolean ;
  // myDate : Date;
  quizDesc : string;
  testStartDate : any;
  questionList : KiKidderQuestModel[] = [];
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
  quizModel : QuizModel;
  quizDuration : number;
  quizName : string;
  isEdit : boolean = false;

  constructor(
    private toastController : ToastController,
    private router : Router,
    private testRoomService: TestRoomService,
    private storage :Storage,
    private activateRoute : ActivatedRoute,
    private quizService : QuizService,
    private popOverController : PopoverController,
    public modalController: ModalController) {

      // let currentDate = Date.now();
      // this.myDate = new Date(currentDate);
    
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
          this.quizName = this.testRoom.quizName;
          this.quizDuration = this.testRoom.quizDuration;
          this.testStartDate = this.testRoom.quizPublishedDate;
          this.quizDesc = this.testRoom.quizDesc;
          this.isEdit = true;
          this.quizPoints = null;
          this.quizPoints = this.testRoom.quizMarks;
          this.isTestroomCreator(this.testRoom.userModel).then((val)=>{
              if(val === 'done')
              {
                this.isTestRoomCreator = true;

              }
          })
          
          
          this.testRoomService.getQuestions(this.testRoom.quizId).subscribe((res:KiKidderQuestModel[])=>{
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

  deleteQuestion(quest : KiKidderQuestModel)
  {

        let index =  this.questionList.indexOf(quest);

        if(index > -1)
        {
            this.questionList.splice(index,1);

        }
        if(quest.uniqueCode != null)
        {
                      
          quest.deleteFl = true;

          this.questionList.push(quest);
        }
  }

  isTestroomCreator(user: userModel)
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.storage.get('kidder_user').then((userData)=>{
          if(userData)
          {     
              if(userData.user_username == user.user_username)
              {
                this.userObject = userData;
                  resolve('done')
              }
             
          }
      })
      }, 1000);
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
                  this.questionList.push(dataRetured.data);

                  console.log('updated questino',this.questionList);
              }else{

                let quest : KiKidderQuestModel = new  KiKidderQuestModel();

                let userQuesModel : UserQuestionModel = new UserQuestionModel();

                let imageInfoModel : ImageInfoModel = new ImageInfoModel();

                let  textQuestModel : TxtQuesInfoModel = new TxtQuesInfoModel(); 
                let imgs : DgrmImageInfoModel[]=[];
                
                if(dataRetured.data.txtQuesInfoModel && dataRetured.data.txtQuesInfoModel.quesTxt)
                {
                  textQuestModel.uniqueCode = dataRetured.data.txtQuesInfoModel.uniqueCode;
                  textQuestModel.quesTxt = dataRetured.data.txtQuesInfoModel.quesTxt;
                  textQuestModel.txt_ques_id = dataRetured.data.txtQuesInfoModel.txt_ques_id;
                  quest.txtQuesInfoModel = textQuestModel;

                }else{
                  quest.txtQuesInfoModel = null;

                }

                // imageInfoModel.img_base64 = dataRetured.data.imgInfoTbls[0].img_base64;
                // imageInfoModel.img_desc = dataRetured.data.imgInfoTbls[0].img_desc;
                // imageInfoModel.img_id = dataRetured.data.imgInfoTbls[0].img_id;
                // imageInfoModel.img_path = dataRetured.data.imgInfoTbls[0].img_path;
                // imageInfoModel.uniqueCode = dataRetured.data.imgInfoTbls[0].uniqueCode;
                imageInfoModel.toBeDeleted = false;
                

                quest.dgrmImageInfoModels = imgs;
                quest.userModel = this.userObject;
                quest.questType = dataRetured.data.questType;
                quest.ki_kidder_quest_ans = dataRetured.data.ki_kidder_quest_ans;
                quest.ki_kidder_quest_optionA = dataRetured.data.ki_kidder_quest_optionA
                quest.ki_kidder_quest_optionB = dataRetured.data.ki_kidder_quest_optionB
                quest.ki_kidder_quest_optionC = dataRetured.data.ki_kidder_quest_optionC
                quest.ki_kidder_quest_optionD = dataRetured.data.ki_kidder_quest_optionD
                quest.ki_kidder_quest_marks = dataRetured.data.ki_kidder_quest_marks;
                quest.dgrmImageInfoModels = dataRetured.data.dgrmImageInfoModels;
                this.questionList.push(quest);



              }
              this.quizPoints = null;

              this.questionList.forEach(element => {
                this.quizPoints = this.quizPoints + element.ki_kidder_quest_marks;
              });
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
    quiz_model.quizCreatedDate = null;
    quiz_model.quizMarks = 0;
    quiz_model.quizNoOfQuest = this.questionList.length;
    quiz_model.quizDuration = this.quizDuration;
    quiz_model.quizPublishedDate = this.testStartDate;
    if(this.isEdit)
    {
        quiz_model.uniqueCode = this.testRoom.uniqueCode;
    }
    this.questionList.forEach(element => {
      quiz_model.quizMarks = quiz_model.quizMarks + element.ki_kidder_quest_marks
    });
    quiz_model.quizCreatedDate = null; // server side
    quiz_model.quizSub = "subject";
    if(this.testRoom && this.testRoom.quizId)
    {
      quiz_model.quizId = this.testRoom.quizId;

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
      this.presentToast("Atleast one question required for Testroom")

    }else{


      let quiz_model : QuizModel = this.getQuizModel();
      if(quiz_model != null)
      {



          if(this.isValidateForm())
          {
            quiz_model.quizName = this.quizName;
            quiz_model.quizDuration;
            quiz_model.quizStatus = 0;
            quiz_model.quizDesc = this.quizDesc
            quiz_model.kidderQuestModels = this.questionList;
            this.quizService.saveQuizModel(quiz_model).subscribe((response:QuizModel)=>{
                console.log(response);
               if(response["status"] == "Success")
               {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    group: JSON.stringify(response.grpModel)
                  }
                };
                  this.router.navigate(['/group-info']);
               }
                
            })
          }else{
            return;
          }
          
        
      }
        
    }
  }


  isValidateForm()
  {
      let flag = true;
      this.durationError = false;
      this.quizNameError = false;
      this.testStartDateError = false;

       if(!this.quizDuration)
      {
          this.durationError = true;
          flag = false;

      }
      if(!this.quizName)
      {
   
        this.quizNameError = true;
        flag = false;
      }
      if(!this.testStartDate)
      {         
         this.testStartDateError = true;
         flag = false;

      }
      if(flag == false)
      {
        this.presentToast("All fields are mandatory")

      }

      return flag;
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

  async presentToast(ev) {
    const toast = await this.toastController.create({
      message: ev,
      duration: 2000,
      position:'top',
      color:'warning'
    });
    toast.present();
  }
}
