import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { GroupModel } from 'src/app/models/GroupModel';
import { QuizModel } from '../create-quiz/models/QuizModel';
import { UrlConstant } from '../../constants/URL';


@Injectable({
  providedIn: 'root'
})
export class TestRoomService {
  
  baseApiUrl = UrlConstant.prodAPIUrl;
  
  constructor(private http :HttpClient, private apService : AppService) {
       
  }

  getTestRoomByGroupId(groupId : number)
  {
      return this.http.get(this.baseApiUrl+"/getTestRoomsByGroupId"+"/"+`${groupId}`);
  }

  getQuestions(quizId : number)
  {
      return this.http.get(this.baseApiUrl+"/getQuestionByQuizId"+"/"+`${quizId}`);
  }

  startTest(room :QuizModel)
  {
      let mode = "start";
      return this.http.post(this.baseApiUrl+"/startTest"+"/"+`${mode}`,room,{observe:'response'});
  }

  endTest(room){
    let mode = "end";
    return this.http.post(this.baseApiUrl+"/startTest"+"/"+`${mode}`,room,{observe:'response'});
  }

}
