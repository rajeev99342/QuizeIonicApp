import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { userModel } from './userModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baserURL = "http://localhost:8080/RestApi/Kidder/main";
  constructor(private http :HttpClient, private apService : AppService) {
        //  apService.getBaseURL().subscribe((baseURL)=>{
        //   this.baserURL =  this.baserURL["baserURL"];
        // });
   }

   saveUserData(userData : userModel)
   {
    const headers = new HttpHeaders({ 'Content-Type': ''});  

      return   this.http.post(this.baserURL+"/saveUserData",userData,{responseType: 'json', headers})
   }

}
