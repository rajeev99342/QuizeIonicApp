import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http : HttpClient) { }

  getBaseURL()
  {
    console.log(this.http.get("./assets/config.json"))
      return this.http.get("./assets/config.json");
  }

}
