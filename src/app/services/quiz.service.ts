import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuizModel } from '../home/group-info/create-quiz/models/QuizModel';
import { UserQuestionModel } from '../home/group-info/create-quiz/models/QuestModel';
import { QuizDetailModel } from '../home/group-info/create-quiz/models/QuizDetailModel';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baserURL = "http://127.0.0.1:8081/kidder/api";
  constructor(private http :HttpClient) {
        //  apService.getBaseURL().subscribe((baseURL)=>{
        //   this.baserURL =  this.baserURL["baserURL"];
        // });
   }

   saveQuizModel(userData : QuizDetailModel)
   {


    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

      return   this.http.post(this.baserURL+"/saveQuiz",userData,{responseType: 'json', headers})
   }
}
