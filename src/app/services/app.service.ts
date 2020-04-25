import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private storage:Storage,private http : HttpClient) { }

  getBaseURL()
  {
    console.log(this.http.get("./assets/config.json"))
      return this.http.get("./assets/config.json");
  }


  
getUsername():string{
  let username = null;
  this.storage.get("kidder_user").then((user)=>{
    username= user;
  })
  return username
}

}

