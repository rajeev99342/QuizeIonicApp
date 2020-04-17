import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuizModel } from '../home/group-info/create-quiz/models/quizModel';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baserURL = "http://127.0.0.1:9090/RestApi/kidder/main";
  constructor(private http :HttpClient) {
        //  apService.getBaseURL().subscribe((baseURL)=>{
        //   this.baserURL =  this.baserURL["baserURL"];
        // });
   }

   saveQuizModel(userData : QuizModel)
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

      return   this.http.post(this.baserURL+"/saveQuiz",userData,{responseType: 'json', headers})
   }
}
