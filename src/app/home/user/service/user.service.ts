import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel } from '../userModel';
import { GroupParticipantModel } from '../../group-info/add-participant/groupPartiModet';
import { UrlConstant } from '../../constants/URL';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // 

  baseApiUrl = UrlConstant.prodAPIUrl;
  basePrtcpntUrl = UrlConstant.prodPrtpntUrl;

  // addParticipantBaseURL = "http://ec2-3-7-158-206.ap-south-1.compute.amazonaws.com:8081/kidder/participant";
  constructor(private http :HttpClient, private apService : AppService) {
       
   }

   saveUserData(userData : userModel)
   {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  

    UrlConstant
      return   this.http.post(this.baseApiUrl+"/saveUserData",userData,{observe:'response'})
   }

   getUserByUsername(username)
   {
     return this.http.get(this.baseApiUrl+"/participant"+"/searchParticipant"+"/"+`${username}`);
   }

   loginUser(username,password)
   {
      const headers = {};

      return this.http.get(this.baseApiUrl+"/login"+"/"+`${username}`+"/"+`${password}`,headers);
   }

   addGroupParticipant(groupPartiModel : GroupParticipantModel)
   {
    return this.http.post(this.baseApiUrl+"/participant"+"/addGrpParticipant",groupPartiModel,{observe:'response'})

   }

}
