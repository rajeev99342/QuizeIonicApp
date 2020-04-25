import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { GroupModel } from 'src/app/models/GroupModel';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baserURL = "http://127.0.0.1:8081/kidder/api";

  
  constructor(private http :HttpClient, private apService : AppService) {
       
  }


  saveGroupInfo(group : GroupModel)
  {
     return this.http.post(this.baserURL+"/saveGroupData",group,{observe:'response'})
  }

  getAllGrpByAdmin(admin,isMyGroup)
  {
      return this.http.get(this.baserURL+"/getGrpByAdmin"+"/"+`${admin}`+"/"+`${isMyGroup}`);
  }

}
