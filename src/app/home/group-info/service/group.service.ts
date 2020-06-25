import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { GroupModel } from 'src/app/models/GroupModel';
import { UrlConstant } from '../../constants/URL';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  baseApiUrl = UrlConstant.prodAPIUrl;

  
  constructor(private http :HttpClient, private apService : AppService) {
       
  }


  getUser()
  {
    return this.http.get(" http://ec2-3-7-158-206.ap-south-1.compute.amazonaws.com:8081/kidder/api/hello");
  }

  saveGroupInfo(group : GroupModel)
  {
     return this.http.post(this.baseApiUrl+"/saveGroupData",group,{observe:'response'})
  }

  getAllGrpByAdmin(admin,isMyGroup)
  {
      return this.http.get(this.baseApiUrl+"/getGrpByAdmin"+"/"+`${admin}`+"/"+`${isMyGroup}`);
  }


  getGroupByUserId(user_id)
  {
    return this.http.get(this.baseApiUrl+"/getGrpsByUserId"+"/"+`${user_id}`);
  }

  userByGroupId(grpId : number)
  {
      return this.http.get(this.baseApiUrl+"/getParticipantByGroup"+"/"+`${grpId}`);
  }

  removeUserOrLeaveGroup(username,grpId,actionBy)
  {
    return this.http.post(this.baseApiUrl+"/removeParticipantOrLeaveGroup"+"/"+`${username}`+"/"+`${grpId}`+"/"+`${actionBy}`,{},{observe:'response'})

  }

}
