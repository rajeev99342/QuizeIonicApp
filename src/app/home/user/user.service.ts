import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { userModel } from './userModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baserURL : string;
  constructor(private http :HttpClient, private apService : AppService) {
         apService.getBaseURL().subscribe((baseURL)=>{
          this.baserURL =  this.baserURL["baserURL"];
        });
   }

   saveUserData(userData : userModel)
   {
        this.http.post(this.baserURL+"saveUserData",userData,{observe: 'response'})
   }

}
