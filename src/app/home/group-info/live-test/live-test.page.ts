import { Component, OnInit } from '@angular/core';
import { TestRoomService } from '../service/testroom.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizModel } from '../create-quiz/models/QuizModel';
import { UserQuestionModel } from '../create-quiz/models/QuestModel';
import * as moment from 'moment'; 
@Component({
  selector: 'app-live-test',
  templateUrl: './live-test.page.html',
  styleUrls: ['./live-test.page.scss'],
})
export class LiveTestPage implements OnInit {


  testRoomModel : QuizModel;

  questionList : UserQuestionModel[] = [];

  duration : any;
  startTime : any;
  timeLeft : any;
  isTestEnded : boolean = false;

  constructor( 
    private testRoomService: TestRoomService,
    private activateRoute : ActivatedRoute,
    private quizService : QuizService) {
      
      this.activateRoute.queryParams.subscribe(params => {
        if (params.roomInfo) {
  
            this.testRoomModel = JSON.parse(params.roomInfo);
          
            this.testRoomService.getQuestions(this.testRoomModel.quiz_id).subscribe((res:UserQuestionModel[])=>{
                 console.log('Hi this is questions',res);
                 this.questionList = res;
                 let now = moment(this.testRoomModel.quiz_created_date);

                 this.duration = this.testRoomModel.quiz_duration;

                 let now1 = moment();

                 this.timeLeft =  now1.diff(now,"minutes");

                 if(this.timeLeft <= this.duration)
                 {
                    console.log('Test Time left',this.timeLeft)
                 }else{
                    console.log('Test Ended');
                    this.isTestEnded = true;
                    this.updateQuizInfo(this.testRoomModel.quiz_id);
                 }

                 var d = new Date(this.testRoomModel.quiz_published_date);
                 console.log("Test Publish Date",now)
                 console.log("Test Publish Time",now1);
                 

            })
          }
         
        })
    


    }

    ngOnInit()
    {


      setTimeout(() => {
         this.endTest();
      }, 600000);

    }

    endTest()
    {
      console.log('test ended');
    }


    updateQuizInfo(quiz_id)
    {
        // this.testRoomService.updateQuiz
    }


  }



