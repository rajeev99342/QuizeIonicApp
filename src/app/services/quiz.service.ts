import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuizModel } from '../home/group-info/create-quiz/models/QuizModel';
import { UserQuestionModel } from '../home/group-info/create-quiz/models/QuestModel';
import { QuizDetailModel } from '../home/group-info/create-quiz/models/QuizDetailModel';
import { UrlConstant } from '../home/constants/URL';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseApiUrl = UrlConstant.prodAPIUrl;

  constructor(private http :HttpClient) {
        //  apService.getBaseURL().subscribe((baseURL)=>{
        //   this.baseApiUrl =  this.baseApiUrl["baserURL"];
        // });
   }

   saveQuizModel(quizModel : QuizModel)
   {


    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

      return   this.http.post(this.baseApiUrl+"/saveQuiz",quizModel,{responseType: 'json', headers})
   }
}
