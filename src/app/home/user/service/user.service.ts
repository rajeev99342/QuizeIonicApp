import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel } from '../userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baserURL = "http://127.0.0.1:8081/kidder/api";
  constructor(private http :HttpClient, private apService : AppService) {
       
   }

   saveUserData(userData : userModel)
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

      return   this.http.post(this.baserURL+"/saveUserData",userData,{observe:'response'})
   }

   getUserByUsername(username)
   {
     return this.http.get(this.baserURL+"/searchParticipant"+"/"+`${username}`);
   }

   loginUser(username,password)
   {
      const headers = {};

      return this.http.get(this.baserURL+"/login"+"/"+`${username}`+"/"+`${password}`,headers);
   }

}
