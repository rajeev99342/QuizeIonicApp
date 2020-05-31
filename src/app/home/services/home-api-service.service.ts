import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeApiServiceService {

  constructor(private http : HttpClient) { }

  getApi()
  {
    const headers = new HttpHeaders({ 'Content-Type': ''});  

      return this.http.get("http://192.168.122.1:8080/RestApi/kidder/main/classAndSubjects.json", {responseType: 'json', headers});
  }

}
