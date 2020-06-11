import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/services/app.service';
import { UrlConstant } from '../../constants/URL';

@Injectable({
  providedIn: 'root'
})
export class DraftService {
  baseApiUrl = UrlConstant.prodAPIUrl;

  constructor(private http :HttpClient, private apService : AppService) { }

  getDraftService(grpId : number)
  {
      return this.http.get(this.baseApiUrl+"/getDraftTest"+"/"+`${grpId}`);
  }


}
