import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { GroupModel } from 'src/app/models/GroupModel';
import { QuizModel } from '../create-quiz/models/QuizModel';


@Injectable({
  providedIn: 'root'
})
export class TestRoomService {
  baserURL = "http://127.0.0.1:8081/kidder/api";

  
  constructor(private http :HttpClient, private apService : AppService) {
       
  }

  getTestRoomByGroupId(groupId : number)
  {
      return this.http.get(this.baserURL+"/getTestRoomsByGroupId"+"/"+`${groupId}`);
  }

  getQuestions(quizId : number)
  {
      return this.http.get(this.baserURL+"/getQuestionByQuizId"+"/"+`${quizId}`);
  }

  startTest(room :QuizModel)
  {
      return this.http.post(this.baserURL+"/startTest",room,{observe:'response'});
  }


}
