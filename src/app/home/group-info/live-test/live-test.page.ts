import { Component, OnInit } from '@angular/core';
import { TestRoomService } from '../service/testroom.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizModel } from '../create-quiz/models/QuizModel';
import { UserQuestionModel } from '../create-quiz/models/QuestModel';

@Component({
  selector: 'app-live-test',
  templateUrl: './live-test.page.html',
  styleUrls: ['./live-test.page.scss'],
})
export class LiveTestPage implements OnInit {


  testRoomModel : QuizModel;

  questionList : UserQuestionModel[] = [];

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
            })
          }
         
        })
    


    }

    ngOnInit()
    {
    }
  }



