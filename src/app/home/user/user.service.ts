import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { userModel } from './userModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baserURL = "http://127.0.0.1:9090/RestApi/kidder/main";
  constructor(private http :HttpClient, private apService : AppService) {
        //  apService.getBaseURL().subscribe((baseURL)=>{
        //   this.baserURL =  this.baserURL["baserURL"];
        // });
   }

   saveUserData(userData : userModel)
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

      return   this.http.post(this.baserURL+"/saveUserData",userData,{responseType: 'json', headers})
   }

}
