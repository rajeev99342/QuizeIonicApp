import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { UrlConstant } from '../../constants/URL';
import { QuizModel } from '../create-quiz/models/QuizModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DraftService {
  baseApiUrl = UrlConstant.prodAPIUrl;

  constructor(private http :HttpClient, private apService : AppService) { }

  getDraftService(grpId : number)
  {
      return this.http.get(this.baseApiUrl+"/kidderTest"+"/getDraftTest"+"/"+`${grpId}`);
  }

  makeItPublic(quiz : QuizModel,status) : Observable<any> 
  {
      let uniqueCode = quiz.uniqueCode;
          
      return this.http.post(this.baseApiUrl+"/kidderTest"+"/updateTestStatus"+"/"+`${status}`,uniqueCode,{observe:'response'});
  }


  startTest(quiz : QuizModel): Observable<any> 
  {
    let uniqueCode = quiz.uniqueCode;

    return this.http.post(this.baseApiUrl+"/kidderTest"+"/startTestPublic",uniqueCode,{observe:'response'});

  }

}
