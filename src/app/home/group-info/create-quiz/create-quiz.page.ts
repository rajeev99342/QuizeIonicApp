import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';
import { QuestModel } from './models/QuestModel';
import { QuizModel } from './models/quizModel';
import { QuizService } from 'src/app/services/quiz.service';
import { PopoverController, NavParams } from '@ionic/angular';
import { QuestSettingPage } from './quest-setting/quest-setting.page';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.page.html',
  styleUrls: ['./create-quiz.page.scss'],
})
export class CreateQuizPage implements OnInit {

  questionList : QuestModel[] = [];
  username : string ="dummyUser";
  grp_name : string = "dummyGrp";
  quiz_name : string = "dummyQuiz"
  cities2 : any = [];
  selectedFriendsArray : any = [];
  examList : any[] = [];
  selectedExamList : any[]= [];

  subjectList : any[]=[];
  selectedSubjectList : any[]=[];

  topicList : any[]=[];
  selectedTopicList : any[]=[];

  popOverSetting : any;

  constructor(private quizService : QuizService,
    private popOverController : PopoverController,
    public modalController: ModalController) {
    
  }

  ngOnInit() {
      this.buildDummyExamList();
      this.buildDummySubjectList();
      this.buildDummyTopicList();
  }

  buildDummyExamList()
  {
      this.examList.push(
        {"name":"SSC","code":"SCC"},
        {"name":"SSC","code":"SCC"},
        {"name":"SSC","code":"SCC"},
        {"name":"SSC","code":"SCC"},
        {"name":"SSC","code":"SCC"},
        {"name":"SSC","code":"SCC"},
        
        )
  }

  buildDummySubjectList()
  {
      this.subjectList.push(
        {"name":"Math","code":"Math"},
        {"name":"Math","code":"Math"},
        {"name":"Math","code":"Math"},
        {"name":"Math","code":"Math"},
        {"name":"Math","code":"Math"},
        {"name":"Math","code":"Math"},
      )
  }
  buildDummyTopicList()
  {
    this.topicList.push(
      {"name":"Topic","code":"Topic"},
      {"name":"Topic","code":"Topic"},
      {"name":"Topic","code":"Topic"},
      {"name":"Topic","code":"Topic"},
      {"name":"Topic","code":"Topic"},
      {"name":"Topic","code":"Topic"},
    )
  }

  async addYourOwnQuestioin()
  {
      const modal = await this.modalController.create({
        component: AddImageQuestionPage,
        backdropDismiss:false,
        cssClass : 'custom-ques-modal'

      });

      modal.onDidDismiss().then(dataRetured=>{
          if(dataRetured.data == false)
          {
              console.log('cancel adding question by user')
          }else
          {

              console.log('question added')
              this.questionList.push(dataRetured.data);
          }
      })
      return await modal.present();
    
  }


  saveQuizWithQuest()
  {
      if(this.questionList.length == 0)
      {
          console.log('please add atleast 5 question')
      }else{


        let quiz_model : QuizModel = this.getQuizModel();
        if(quiz_model != null)
        {

            console.log('save quiz model',quiz_model)
            this.quizService.saveQuizModel(quiz_model).subscribe((response)=>{
                console.log(response);
            })
        }
          
      }
  }

  getQuizModel()
  {
    let quiz_model : QuizModel = new QuizModel();
    quiz_model.grp_name = this.grp_name;
    quiz_model.quiz_created_date = null;
    quiz_model.quiz_creator = this.username;
    quiz_model.quiz_duration = 30; // sec
    quiz_model.quiz_exam.push("SSC");
    quiz_model.quiz_marks = 40;
    quiz_model.quiz_name = this.quiz_name;
    quiz_model.quiz_num_of_ques = this.questionList.length;
    quiz_model.quiz_published_date = null; // server side
    quiz_model.quiz_sub.push("dummySubject","sub2");
    quiz_model.quiz_exam.push("dummyExam");
    quiz_model.quiz_time = null;
    quiz_model.quiz_topic.push("topic1","topic2");
    quiz_model.grp_name = this.grp_name;
    quiz_model.user_questlist = this.questionList;
    return quiz_model;
  }

  async openQuestionSetting(ev: any) {
    const popOverSetting = await this.popOverController.create({
      component: QuestSettingPage,
      event: ev,
     cssClass:'custom-setting',
      
    });
    return await popOverSetting.present();
  }

}
